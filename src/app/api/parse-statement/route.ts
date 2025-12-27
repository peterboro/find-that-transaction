import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { uploadPdf } from '@/lib/cloudinary'
import { convertPdfToImages } from '@/lib/pdf-to-images'
import { parseStatementWithGemini } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get or create user in database
    let dbUser = await db.user.findUnique({ where: { clerkId: userId } })
    
    if (!dbUser) {
      const clerkUser = await currentUser()
      dbUser = await db.user.create({
        data: {
          clerkId: userId,
          email: clerkUser?.emailAddresses[0]?.emailAddress || '',
          firstName: clerkUser?.firstName,
          lastName: clerkUser?.lastName,
          imageUrl: clerkUser?.imageUrl,
        },
      })
    }

    // Check usage limits
    if (dbUser.plan === 'FREE' && dbUser.statementsUsed >= dbUser.statementsLimit) {
      return NextResponse.json(
        { error: 'Limit reached', message: 'You have reached your monthly limit. Upgrade to Pro for unlimited statements.' },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Invalid file', message: 'Please upload a PDF file' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload to Cloudinary
    const { url: fileUrl, publicId: filePublicId } = await uploadPdf(buffer, file.name)

    // Create statement record
    const statement = await db.statement.create({
      data: {
        userId: dbUser.id,
        fileName: file.name,
        fileUrl,
        filePublicId,
        fileSize: buffer.length,
        status: 'PROCESSING',
      },
    })

    try {
      // Convert PDF to images
      const images = await convertPdfToImages(buffer)
      
      // Update page count
      await db.statement.update({
        where: { id: statement.id },
        data: { pageCount: images.length },
      })

      // Parse with Gemini AI
      const transactions = await parseStatementWithGemini(images)

      // Save transactions to database
      if (transactions.length > 0) {
        await db.transaction.createMany({
          data: transactions.map(t => ({
            userId: dbUser!.id,
            statementId: statement.id,
            date: t.date,
            description: t.description,
            debit: t.debit,
            credit: t.credit,
            balance: t.balance,
          })),
        })
      }

      // Update statement status
      await db.statement.update({
        where: { id: statement.id },
        data: { status: 'COMPLETED' },
      })

      // Increment usage
      await db.user.update({
        where: { id: dbUser.id },
        data: { statementsUsed: { increment: 1 } },
      })

      return NextResponse.json({
        success: true,
        statementId: statement.id,
        transactions,
        count: transactions.length,
        message: `Successfully parsed ${transactions.length} transactions`,
      })

    } catch (parseError: any) {
      // Update statement with error
      await db.statement.update({
        where: { id: statement.id },
        data: {
          status: 'FAILED',
          errorMessage: parseError.message,
        },
      })

      return NextResponse.json(
        { error: 'Parse failed', message: parseError.message },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('Parse error:', error)
    return NextResponse.json(
      { error: 'Server error', message: error.message },
      { status: 500 }
    )
  }
}
