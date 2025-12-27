'use client'

import { useState, useCallback, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  FileSearch, 
  Upload, 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft,
  FileText,
  Download,
  Trash2,
  Crown,
  AlertCircle,
  CheckCircle,
  History,
  X
} from 'lucide-react'

interface Transaction {
  id: string
  date: string
  description: string
  debit: number | null
  credit: number | null
  balance: number | null
  statement?: { fileName: string }
}

interface UserData {
  plan: string
  statementsUsed: number
  statementsLimit: number
  totalStatements: number
  totalTransactions: number
}

export default function Dashboard() {
  const { user } = useUser()
  const searchParams = useSearchParams()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [totals, setTotals] = useState({ debit: 0, credit: 0 })
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  // Check payment status from URL
  useEffect(() => {
    const payment = searchParams.get('payment')
    if (payment === 'success') {
      setSuccess('Payment successful! Your plan has been upgraded.')
    } else if (payment === 'failed') {
      setError('Payment failed. Please try again.')
    }
  }, [searchParams])

  // Fetch user data
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        if (data.user) setUserData(data.user)
      })
      .catch(console.error)
  }, [])

  // Fetch transactions
  const fetchTransactions = useCallback(async (search = '') => {
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      
      const res = await fetch(`/api/transactions?${params}`)
      const data = await res.json()
      
      if (data.transactions) {
        setTransactions(data.transactions)
        setTotals(data.totals)
      }
    } catch (err) {
      console.error('Failed to fetch transactions:', err)
    }
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    fetchTransactions(term)
  }, [fetchTransactions])

  const handleFile = async (file: File) => {
    if (!file || file.type !== 'application/pdf') {
      setError('Please upload a PDF file')
      return
    }

    // Check limit
    if (userData && userData.plan === 'FREE' && userData.statementsUsed >= userData.statementsLimit) {
      setShowUpgradeModal(true)
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)
    setFileName(file.name)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/parse-statement', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok && data.transactions) {
        setSuccess(`Successfully parsed ${data.count} transactions`)
        fetchTransactions()
        // Refresh user data
        const userRes = await fetch('/api/user')
        const userData = await userRes.json()
        if (userData.user) setUserData(userData.user)
      } else {
        setError(data.message || 'Failed to parse statement')
      }
    } catch (err) {
      setError('Failed to parse statement. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [userData])

  const handleUpgrade = async (plan: 'PRO' | 'BUSINESS') => {
    try {
      const res = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      const data = await res.json()

      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl
      } else {
        setError(data.error || 'Failed to initialize payment')
      }
    } catch (err) {
      setError('Failed to initialize payment')
    }
  }

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Debit', 'Credit', 'Balance']
    const rows = transactions.map(t => [
      t.date,
      `"${t.description.replace(/"/g, '""')}"`,
      t.debit || '',
      t.credit || '',
      t.balance || ''
    ])
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transactions.csv'
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <FileSearch className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold text-white">FindThatTransaction</span>
            </Link>
            <div className="flex items-center gap-4">
              {userData && (
                <div className="hidden sm:flex items-center gap-2 text-sm">
                  {userData.plan === 'FREE' ? (
                    <button
                      onClick={() => setShowUpgradeModal(true)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-xs font-medium hover:opacity-90 transition"
                    >
                      <Crown className="h-3 w-3" />
                      Upgrade
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 px-3 py-1.5 bg-primary-500/20 text-primary-400 rounded-full text-xs font-medium">
                      <Crown className="h-3 w-3" />
                      {userData.plan}
                    </span>
                  )}
                  <span className="text-gray-500">
                    {userData.statementsLimit === -1 
                      ? `${userData.statementsUsed} statements` 
                      : `${userData.statementsUsed}/${userData.statementsLimit} statements`}
                  </span>
                </div>
              )}
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto">
              <X className="h-4 w-4 text-red-400" />
            </button>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-sm">{success}</p>
            <button onClick={() => setSuccess(null)} className="ml-auto">
              <X className="h-4 w-4 text-green-400" />
            </button>
          </div>
        )}

        {/* Upload Section */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false) }}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all mb-8 ${
            isDragging
              ? 'border-primary-500 bg-primary-500/10'
              : 'border-gray-700 bg-gray-900 hover:border-gray-600'
          }`}
        >
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
              <p className="text-gray-400">Parsing your statement with AI...</p>
              <p className="text-gray-500 text-sm mt-2">This may take a minute</p>
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-white font-medium mb-2">
                Drag and drop your bank statement PDF
              </p>
              <p className="text-gray-500 text-sm mb-4">or</p>
              <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition">
                Browse Files
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </label>
            </>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <ArrowUpRight className="h-4 w-4 text-red-400" />
              Total Sent
            </div>
            <p className="text-2xl font-bold text-red-400">
              {totals.debit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <ArrowDownLeft className="h-4 w-4 text-green-400" />
              Total Received
            </div>
            <p className="text-2xl font-bold text-green-400">
              {totals.credit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <FileText className="h-4 w-4" />
              Transactions
            </div>
            <p className="text-2xl font-bold text-white">{transactions.length}</p>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={exportCSV}
            disabled={transactions.length === 0}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white rounded-xl transition"
          >
            <Download className="h-5 w-5" />
            Export CSV
          </button>
        </div>

        {/* Transactions Table */}
        {transactions.length > 0 ? (
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="px-6 py-4 text-sm font-medium text-gray-400">Date</th>
                    <th className="px-6 py-4 text-sm font-medium text-gray-400">Description</th>
                    <th className="px-6 py-4 text-sm font-medium text-gray-400 text-right">Debit</th>
                    <th className="px-6 py-4 text-sm font-medium text-gray-400 text-right">Credit</th>
                    <th className="px-6 py-4 text-sm font-medium text-gray-400 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-800/50">
                      <td className="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 text-sm text-white">
                        {searchTerm ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: transaction.description.replace(
                                new RegExp(`(${searchTerm})`, 'gi'),
                                '<mark class="bg-yellow-500/30 text-yellow-200 rounded px-0.5">$1</mark>'
                              ),
                            }}
                          />
                        ) : (
                          transaction.description
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                        {transaction.debit ? (
                          <span className="text-red-400">
                            {transaction.debit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        ) : (
                          <span className="text-gray-600">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                        {transaction.credit ? (
                          <span className="text-green-400">
                            {transaction.credit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                        ) : (
                          <span className="text-gray-600">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 text-right whitespace-nowrap">
                        {transaction.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <History className="h-12 w-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No transactions yet</p>
            <p className="text-gray-600 text-sm">Upload a bank statement to get started</p>
          </div>
        )}
      </main>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Upgrade Your Plan</h3>
              <button onClick={() => setShowUpgradeModal(false)}>
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            <p className="text-gray-400 mb-6">
              You've reached your free limit of 5 statements per month. Upgrade to continue parsing statements.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => handleUpgrade('PRO')}
                className="w-full p-4 bg-primary-600 hover:bg-primary-700 rounded-xl text-left transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Pro Plan</p>
                    <p className="text-primary-200 text-sm">Unlimited statements</p>
                  </div>
                  <p className="text-white font-bold">KES 900/mo</p>
                </div>
              </button>

              <button
                onClick={() => handleUpgrade('BUSINESS')}
                className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-left transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-white">Business Plan</p>
                    <p className="text-gray-400 text-sm">Everything + team access</p>
                  </div>
                  <p className="text-white font-bold">KES 4,900/mo</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
