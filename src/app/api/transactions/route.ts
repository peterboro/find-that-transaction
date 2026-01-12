import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await db.user.findUnique({ where: { clerkId: userId } })
    if (!dbUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const statementId = searchParams.get('statementId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '100')

    const where: any = { userId: dbUser.id }
    
    if (statementId) {
      where.statementId = statementId
    }
    
    if (search) {
      where.description = { contains: search, mode: 'insensitive' }
    }

    const [transactions, total] = await Promise.all([
      db.transaction.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          statement: {
            select: { fileName: true },
          },
        },
      }),
      db.transaction.count({ where }),
    ])

    // Calculate totals
    const totals = await db.transaction.aggregate({
      where,
      _sum: {
        debit: true,
        credit: true,
      },
    })

    return NextResponse.json({
      transactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      totals: {
        debit: totals._sum.debit || 0,
        credit: totals._sum.credit || 0,
      },
    })
  } catch (error: any) {
    console.error('Transactions error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
