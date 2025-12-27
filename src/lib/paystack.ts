import axios from 'axios'

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!
const PAYSTACK_BASE_URL = 'https://api.paystack.co'

const paystackApi = axios.create({
  baseURL: PAYSTACK_BASE_URL,
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
})

export const PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    statementsLimit: 5,
    features: ['5 statements/month', 'Basic search', 'CSV export'],
  },
  PRO: {
    name: 'Pro',
    price: 900, // 900 KES = ~$9
    priceId: process.env.PAYSTACK_PRO_PLAN_CODE, // Paystack plan code
    statementsLimit: -1, // unlimited
    features: ['Unlimited statements', 'Advanced search', 'CSV & Excel export', 'API access'],
  },
  BUSINESS: {
    name: 'Business',
    price: 4900, // 4900 KES = ~$49
    priceId: process.env.PAYSTACK_BUSINESS_PLAN_CODE,
    statementsLimit: -1,
    features: ['Everything in Pro', 'Team access', 'Priority support', 'Custom integrations'],
  },
}

export async function initializeTransaction({
  email,
  amount,
  plan,
  userId,
  callbackUrl,
}: {
  email: string
  amount: number
  plan: string
  userId: string
  callbackUrl: string
}) {
  const response = await paystackApi.post('/transaction/initialize', {
    email,
    amount: amount * 100, // Convert to kobo
    currency: 'KES',
    callback_url: callbackUrl,
    metadata: {
      userId,
      plan,
    },
  })

  return response.data
}

export async function verifyTransaction(reference: string) {
  const response = await paystackApi.get(`/transaction/verify/${reference}`)
  return response.data
}

export async function createSubscription({
  email,
  planCode,
  userId,
}: {
  email: string
  planCode: string
  userId: string
}) {
  // First, create or get customer
  const customerRes = await paystackApi.post('/customer', { email })
  const customerCode = customerRes.data.data.customer_code

  // Initialize subscription
  const response = await paystackApi.post('/subscription', {
    customer: customerCode,
    plan: planCode,
    metadata: { userId },
  })

  return response.data
}

export async function cancelSubscription(subscriptionCode: string, emailToken: string) {
  const response = await paystackApi.post('/subscription/disable', {
    code: subscriptionCode,
    token: emailToken,
  })
  return response.data
}

export async function getSubscription(subscriptionId: string) {
  const response = await paystackApi.get(`/subscription/${subscriptionId}`)
  return response.data
}
