import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyTransaction, PLANS } from '@/lib/paystack'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const reference = searchParams.get('reference')

    if (!reference) {
      return NextResponse.redirect(new URL('/dashboard?payment=failed', request.url))
    }

    // Verify transaction with Paystack
    const result = await verifyTransaction(reference)

    if (!result.status || result.data.status !== 'success') {
      // Update payment record
      await db.payment.update({
        where: { paystackRef: reference },
        data: { status: 'FAILED' },
      })

      return NextResponse.redirect(new URL('/dashboard?payment=failed', request.url))
    }

    // Get payment record
    const payment = await db.payment.findUnique({
      where: { paystackRef: reference },
    })

    if (!payment) {
      return NextResponse.redirect(new URL('/dashboard?payment=failed', request.url))
    }

    // Update payment status
    await db.payment.update({
      where: { paystackRef: reference },
      data: { status: 'SUCCESS' },
    })

    // Update user's plan
    const planDetails = PLANS[payment.plan as keyof typeof PLANS]
    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + 1) // 1 month subscription

    await db.user.update({
      where: { clerkId: payment.clerkId },
      data: {
        plan: payment.plan,
        statementsLimit: planDetails.statementsLimit,
        planExpiresAt: expiresAt,
        customerId: result.data.customer.customer_code,
      },
    })

    return NextResponse.redirect(new URL('/dashboard?payment=success', request.url))
  } catch (error: any) {
    console.error('Payment callback error:', error)
    return NextResponse.redirect(new URL('/dashboard?payment=failed', request.url))
  }
}
