import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Find That Transaction | AI-Powered Bank Statement Parser',
  description: 'Upload any bank statement PDF and instantly search through your transactions. Powered by AI, works with any bank worldwide.',
  keywords: ['bank statement', 'transaction search', 'PDF parser', 'financial tool', 'M-Pesa', 'bank reconciliation'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
