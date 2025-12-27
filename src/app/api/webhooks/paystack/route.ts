import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { db } from '@/lib/db'
import { PLANS } from '@/lib/paystack'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-paystack-signature')

    // Verify webhook signature
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest('hex')

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const event = JSON.parse(body)

    switch (event.event) {
      case 'charge.success': {
        const { reference, customer, metadata } = event.data
        
        // Find and update payment
        const payment = await db.payment.findUnique({
          where: { paystackRef: reference },
        })

        if (payment) {
          await db.payment.update({
            where: { paystackRef: reference },
            data: { status: 'SUCCESS' },
          })

          // Update user plan
          const planDetails = PLANS[payment.plan as keyof typeof PLANS]
          const expiresAt = new Date()
          expiresAt.setMonth(expiresAt.getMonth() + 1)

          await db.user.update({
            where: { clerkId: payment.clerkId },
            data: {
              plan: payment.plan,
              statementsLimit: planDetails.statementsLimit,
              planExpiresAt: expiresAt,
              customerId: customer.customer_code,
            },
          })
        }
        break
      }

      case 'subscription.create': {
        const { subscription_code, customer, plan } = event.data
        
        await db.user.updateMany({
          where: { customerId: customer.customer_code },
          data: { subscriptionId: subscription_code },
        })
        break
      }

      case 'subscription.disable': {
        const { customer } = event.data
        
        await db.user.updateMany({
          where: { customerId: customer.customer_code },
          data: {
            plan: 'FREE',
            subscriptionId: null,
            statementsLimit: 5,
          },
        })
        break
      }

      case 'invoice.payment_failed': {
        const { customer } = event.data
        
        // Downgrade to free on payment failure
        await db.user.updateMany({
          where: { customerId: customer.customer_code },
          data: {
            plan: 'FREE',
            statementsLimit: 5,
          },
        })
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
