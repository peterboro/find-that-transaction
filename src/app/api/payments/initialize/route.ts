import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { initializeTransaction, PLANS } from '@/lib/paystack'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const clerkUser = await currentUser()
    const email = clerkUser?.emailAddresses[0]?.emailAddress

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const { plan } = await request.json()

    if (!plan || !['PRO', 'BUSINESS'].includes(plan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const planDetails = PLANS[plan as keyof typeof PLANS]
    const amount = planDetails.price

    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/callback`

    const result = await initializeTransaction({
      email,
      amount,
      plan,
      userId,
      callbackUrl,
    })

    if (!result.status) {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }

    // Create pending payment record
    await db.payment.create({
      data: {
        clerkId: userId,
        paystackRef: result.data.reference,
        amount: amount * 100,
        plan: plan as any,
        status: 'PENDING',
      },
    })

    return NextResponse.json({
      authorizationUrl: result.data.authorization_url,
      reference: result.data.reference,
    })
  } catch (error: any) {
    console.error('Payment init error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
