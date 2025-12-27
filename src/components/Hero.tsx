'use client'

import { SignUpButton, useAuth } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowRight, Upload, Search, PieChart } from 'lucide-react'

export default function Hero() {
  const { isSignedIn } = useAuth()

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
            </span>
            Now supporting 100+ banks worldwide
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 text-balance">
            Find any transaction in{' '}
            <span className="text-primary-600">seconds</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 text-balance">
            Upload any bank statement PDF and instantly search through thousands of transactions. 
            AI-powered parsing works with any bank, any format, anywhere in the world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition shadow-lg shadow-primary-500/25"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <SignUpButton mode="modal">
                <button className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition shadow-lg shadow-primary-500/25">
                  Start Free — No Credit Card
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </SignUpButton>
            )}
            <Link
              href="#demo"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl transition"
            >
              See How It Works
            </Link>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
              <Upload className="h-4 w-4 text-primary-600" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Upload PDF</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
              <Search className="h-4 w-4 text-primary-600" />
              <span className="text-sm text-gray-600 dark:text-gray-300">Search Instantly</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
              <PieChart className="h-4 w-4 text-primary-600" />
              <span className="text-sm text-gray-600 dark:text-gray-300">See Totals</span>
            </div>
          </div>

          {/* Hero Image / Demo */}
          <div className="relative max-w-5xl mx-auto" id="demo">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 blur-3xl -z-10 rounded-3xl"></div>
            <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-gray-400">findthattransaction.com/dashboard</span>
                </div>
              </div>
              {/* App Screenshot */}
              <div className="p-6 bg-gray-950">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                    <p className="text-gray-400 text-sm mb-1">Total Sent</p>
                    <p className="text-2xl font-bold text-red-400">2,796,696.53</p>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                    <p className="text-gray-400 text-sm mb-1">Total Received</p>
                    <p className="text-2xl font-bold text-green-400">2,796,846.53</p>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                    <p className="text-gray-400 text-sm mb-1">Transactions</p>
                    <p className="text-2xl font-bold text-white">883</p>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                  <div className="p-4 border-b border-gray-800">
                    <input 
                      type="text" 
                      placeholder="Search transactions..." 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500"
                      defaultValue="DANIEL"
                    />
                  </div>
                  <div className="divide-y divide-gray-800">
                    {[
                      { date: '2025-12-19', desc: 'DANIEL GICHUHI KARANU', debit: null, credit: 150 },
                      { date: '2025-12-18', desc: 'DANIEL M TRANSFERS', debit: 500, credit: null },
                      { date: '2025-12-15', desc: 'Payment from DANIEL K', debit: null, credit: 2500 },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-800/50">
                        <div>
                          <p className="text-white font-medium">{tx.desc}</p>
                          <p className="text-gray-500 text-sm">{tx.date}</p>
                        </div>
                        <div className="text-right">
                          {tx.debit && <p className="text-red-400 font-medium">-{tx.debit.toLocaleString()}</p>}
                          {tx.credit && <p className="text-green-400 font-medium">+{tx.credit.toLocaleString()}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
