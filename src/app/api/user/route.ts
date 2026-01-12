import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let dbUser = await db.user.findUnique({
      where: { clerkId: userId },
      include: {
        _count: {
          select: { statements: true, transactions: true },
        },
      },
    })

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
        include: {
          _count: {
            select: { statements: true, transactions: true },
          },
        },
      })
    }

    return NextResponse.json({
      user: {
        id: dbUser.id,
        email: dbUser.email,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        plan: dbUser.plan,
        statementsUsed: dbUser.statementsUsed,
        statementsLimit: dbUser.statementsLimit,
        planExpiresAt: dbUser.planExpiresAt,
        totalStatements: dbUser._count.statements,
        totalTransactions: dbUser._count.transactions,
      },
    })
  } catch (error: any) {
    console.error('User error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
