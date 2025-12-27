'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Which banks do you support?',
    answer: 'We support virtually any bank worldwide. Our AI-powered parser can read M-Pesa, Equity Bank, KCB, Family Bank, Standard Chartered, Chase, Bank of America, HSBC, Barclays, and hundreds more. If it\'s a PDF bank statement, we can parse it.',
  },
  {
    question: 'How does the AI parsing work?',
    answer: 'We use advanced vision AI to analyze your bank statement images. This means we can read scanned documents, image-based PDFs, and even statements with unusual formats. The AI extracts transaction dates, descriptions, amounts, and running balances automatically.',
  },
  {
    question: 'Is my financial data secure?',
    answer: 'Absolutely. Your files are encrypted during upload and processing. We don\'t store your original PDFs permanently — they\'re processed and then deleted. Transaction data is encrypted at rest and we never share your information with third parties.',
  },
  {
    question: 'Can I search across multiple statements?',
    answer: 'Yes! Upload multiple statements from different banks or different time periods and search across all of them at once. Great for finding recurring payments or tracking a specific vendor across months.',
  },
  {
    question: 'What file formats do you accept?',
    answer: 'We accept PDF files of any size. This includes native PDFs with selectable text, scanned documents, and image-based PDFs. If your bank provides statements in PDF format, we can process them.',
  },
  {
    question: 'Can I export my transactions?',
    answer: 'Yes, you can export your parsed transactions to CSV or Excel format. This makes it easy to import into accounting software like QuickBooks, Xero, or your own spreadsheets.',
  },
  {
    question: 'What if parsing fails for my statement?',
    answer: 'Our AI handles 99% of bank statements successfully. If you encounter issues, our support team can help. Pro and Business users get priority support with faster resolution times.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes. If you\'re not satisfied within the first 14 days, we\'ll refund your payment in full, no questions asked.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to know about FindThatTransaction
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
