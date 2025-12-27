'use client'

import { Check } from 'lucide-react'
import { SignUpButton, useAuth } from '@clerk/nextjs'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for personal use',
    features: [
      '5 statements per month',
      'Up to 100 transactions per statement',
      'Basic search',
      'CSV export',
      'Email support',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '9',
    description: 'For power users and freelancers',
    features: [
      'Unlimited statements',
      'Unlimited transactions',
      'Advanced search & filters',
      'CSV & Excel export',
      'Transaction categorization',
      'Priority support',
      'API access',
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
  {
    name: 'Business',
    price: '49',
    description: 'For teams and businesses',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Multiple bank accounts',
      'Custom categories',
      'Audit logs',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export default function Pricing() {
  const { isSignedIn } = useAuth()

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Start for free, upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/25 scale-105'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 text-sm font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${
                  plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${
                  plan.highlighted ? 'text-primary-100' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${
                  plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'
                }`}>
                  ${plan.price}
                </span>
                <span className={`text-sm ${
                  plan.highlighted ? 'text-primary-100' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  /month
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className={`w-5 h-5 flex-shrink-0 ${
                      plan.highlighted ? 'text-primary-200' : 'text-primary-600'
                    }`} />
                    <span className={`text-sm ${
                      plan.highlighted ? 'text-primary-50' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {isSignedIn ? (
                <Link
                  href="/dashboard"
                  className={`block w-full py-3 px-4 rounded-xl font-semibold text-center transition ${
                    plan.highlighted
                      ? 'bg-white text-primary-600 hover:bg-gray-100'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  Go to Dashboard
                </Link>
              ) : (
                <SignUpButton mode="modal">
                  <button
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition ${
                      plan.highlighted
                        ? 'bg-white text-primary-600 hover:bg-gray-100'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </SignUpButton>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          All plans include a 14-day free trial. Cancel anytime.
        </p>
      </div>
    </section>
  )
}
