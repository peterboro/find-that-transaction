import { 
  Upload, 
  Search, 
  Globe, 
  Zap, 
  Shield, 
  Download,
  FileText,
  Brain
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Parsing',
    description: 'Our advanced AI understands any bank statement format — scanned, digital, or image-based PDFs.',
  },
  {
    icon: Globe,
    title: 'Works Worldwide',
    description: 'Supports 100+ banks globally. M-Pesa, Equity, Chase, HSBC, and many more.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Upload your statement and get searchable transactions in seconds, not hours.',
  },
  {
    icon: Search,
    title: 'Powerful Search',
    description: 'Find any transaction instantly with keyword search. Filter by date, amount, or description.',
  },
  {
    icon: Shield,
    title: 'Bank-Grade Security',
    description: 'Your data is encrypted end-to-end. We never store your sensitive financial information.',
  },
  {
    icon: Download,
    title: 'Export Anywhere',
    description: 'Download your parsed transactions as CSV or Excel for accounting software.',
  },
  {
    icon: FileText,
    title: 'Multi-Statement Support',
    description: 'Upload multiple statements and search across all your accounts in one place.',
  },
  {
    icon: Upload,
    title: 'Drag & Drop Upload',
    description: 'Simply drag your PDF onto the page. No complicated setup required.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to find transactions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stop scrolling through endless PDF pages. Let AI do the heavy lifting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
