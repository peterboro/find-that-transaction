# Find That Transaction - SaaS

AI-powered bank statement parser with subscription billing.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Clerk
- **Database**: PostgreSQL + Prisma
- **Payments**: Paystack
- **File Storage**: Cloudinary
- **AI**: Google Gemini Vision
- **Styling**: Tailwind CSS

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up services

You'll need accounts with:

| Service | Purpose | Link |
|---------|---------|------|
| Clerk | Authentication | https://dashboard.clerk.com |
| Neon/Supabase | PostgreSQL database | https://neon.tech |
| Paystack | Payment processing | https://dashboard.paystack.com |
| Cloudinary | File storage | https://cloudinary.com |
| Google AI | PDF parsing | https://aistudio.google.com/app/apikey |

### 3. Configure environment

```bash
cp .env.example .env.local
```

Fill in all the API keys in `.env.local`

### 4. Set up database

```bash
npx prisma db push
```

### 5. Install PDF conversion tool

```bash
pip install pdf2image
```

**Install Poppler:**
- Windows: https://github.com/osborn/poppler-windows/releases
- Mac: `brew install poppler`
- Linux: `sudo apt install poppler-utils`

### 6. Run development server

```bash
npm run dev
```

Open http://localhost:3000

## Project Structure

```
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── parse-statement/   # PDF parsing endpoint
│   │   │   ├── payments/          # Paystack integration
│   │   │   ├── statements/        # Statement CRUD
│   │   │   ├── transactions/      # Transaction queries
│   │   │   ├── user/              # User data
│   │   │   └── webhooks/          # Clerk & Paystack webhooks
│   │   ├── dashboard/             # Protected dashboard
│   │   └── page.tsx               # Landing page
│   ├── components/                # React components
│   └── lib/
│       ├── cloudinary.ts          # File upload
│       ├── db.ts                  # Prisma client
│       ├── gemini.ts              # AI parsing
│       ├── paystack.ts            # Payment processing
│       └── pdf-to-images.ts       # PDF conversion
```

## Features

- ✅ Landing page with pricing
- ✅ User authentication (Clerk)
- ✅ PostgreSQL database (Prisma)
- ✅ PDF upload to Cloudinary
- ✅ AI parsing with Gemini
- ✅ Paystack payments
- ✅ Usage limits by plan
- ✅ Transaction search
- ✅ CSV export

## Pricing Plans

| Plan | Price | Statements |
|------|-------|------------|
| Free | $0 | 5/month |
| Pro | KES 900 (~$9) | Unlimited |
| Business | KES 4,900 (~$49) | Unlimited + Team |

## Deployment

### Vercel (Recommended)

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for a complete step-by-step deployment guide.

**Quick Steps:**
1. Push code to GitHub
2. Import to Vercel
3. Add all environment variables (see DEPLOYMENT.md for full list)
4. Configure webhooks
5. Deploy

**⚠️ Important:** The current PDF conversion uses Python, which won't work on Vercel serverless functions. You'll need to implement a Node.js alternative or use an external service. See DEPLOYMENT.md for details.

## Webhooks Setup

### Clerk Webhook
1. Go to Clerk Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/clerk`
3. Subscribe to: `user.created`, `user.updated`, `user.deleted`
4. Copy signing secret to `CLERK_WEBHOOK_SECRET`

### Paystack Webhook
1. Go to Paystack Dashboard → Settings → API Keys & Webhooks
2. Add webhook URL: `https://yourdomain.com/api/webhooks/paystack`
3. The secret key is your `PAYSTACK_SECRET_KEY`

## License

MIT
