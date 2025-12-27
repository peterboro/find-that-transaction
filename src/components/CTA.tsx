'use client'

import { SignUpButton, useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  const { isSignedIn } = useAuth()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 shadow-xl shadow-primary-500/25">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to find that transaction?
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who save hours every month searching through bank statements. 
            Start for free, no credit card required.
          </p>
          
          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          ) : (
            <SignUpButton mode="modal">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </SignUpButton>
          )}
        </div>
      </div>
    </section>
  )
}
