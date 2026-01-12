# Vercel Deployment Guide

This guide will walk you through deploying Find That Transaction to Vercel.

## Prerequisites

1. **GitHub Account** - Your code needs to be in a GitHub repository
2. **Vercel Account** - Sign up at https://vercel.com
3. **All Service Accounts** - Make sure you have accounts for:
   - Clerk (Authentication)
   - Neon/Supabase (PostgreSQL Database)
   - Paystack (Payments)
   - Cloudinary (File Storage)
   - Google AI Studio (Gemini API)

## Step 1: Push Code to GitHub

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub and push:
   ```bash
   git remote add origin https://github.com/yourusername/find-that-transaction.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect Next.js settings
4. **Don't deploy yet** - we need to set up environment variables first

### Option B: Using Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Step 3: Configure Environment Variables

In your Vercel project dashboard, go to **Settings → Environment Variables** and add:

### Required Environment Variables

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_WEBHOOK_SECRET=whsec_...

# Database
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google Gemini AI
GEMINI_API_KEY=AIzaSy...

# Paystack
PAYSTACK_SECRET_KEY=sk_live_...
PAYSTACK_PRO_PLAN_CODE=PLN_... (optional, for subscriptions)
PAYSTACK_BUSINESS_PLAN_CODE=PLN_... (optional, for subscriptions)

# App URL (for payment callbacks)
NEXT_PUBLIC_APP_URL=https://yourdomain.vercel.app
```

**Important Notes:**
- Use **production** keys (not test keys) for live deployment
- Set variables for **Production**, **Preview**, and **Development** environments
- `NEXT_PUBLIC_APP_URL` should be your actual Vercel domain (update after first deployment)

## Step 4: Database Setup

1. Run Prisma migrations on your production database:
   ```bash
   npx prisma db push
   ```
   Or use Prisma Migrate:
   ```bash
   npx prisma migrate deploy
   ```

2. Make sure your `DATABASE_URL` in Vercel points to your production database

## Step 5: PDF Conversion Setup (Important!)

**⚠️ Challenge:** Vercel serverless functions don't support Python by default. You have two options:

### Option 1: Use Node.js PDF Library (Recommended)

Replace the Python-based PDF conversion with a Node.js solution. Install a package like `pdf-poppler` or use a service.

### Option 2: Use External PDF Service

Use a service like:
- Cloudinary's PDF to image conversion
- Adobe PDF Services API
- Or another PDF conversion API

### Option 3: Vercel Serverless Functions with Python (Advanced)

This requires custom configuration and may have limitations.

**For now, the app will need modification to work on Vercel.** The current Python-based PDF conversion won't work in serverless functions.

## Step 6: Deploy

1. After setting all environment variables, click **Deploy** in Vercel
2. Wait for the build to complete
3. Your app will be live at `https://yourproject.vercel.app`

## Step 7: Configure Webhooks

### Clerk Webhook

1. Go to Clerk Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.vercel.app/api/webhooks/clerk`
3. Subscribe to events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
4. Copy the signing secret and add it to Vercel as `CLERK_WEBHOOK_SECRET`

### Paystack Webhook

1. Go to Paystack Dashboard → Settings → API Keys & Webhooks
2. Add webhook URL: `https://yourdomain.vercel.app/api/webhooks/paystack`
3. The secret key is your `PAYSTACK_SECRET_KEY` (already in environment variables)

## Step 8: Update App URL

After deployment, update `NEXT_PUBLIC_APP_URL` in Vercel to your actual domain:
- Go to Settings → Environment Variables
- Update `NEXT_PUBLIC_APP_URL` to your Vercel domain
- Redeploy

## Step 9: Custom Domain (Optional)

1. Go to Vercel project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` to your custom domain

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify `package.json` scripts are correct

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Check database allows connections from Vercel IPs
- Ensure SSL is enabled (`?sslmode=require`)

### PDF Conversion Not Working

- The Python-based conversion won't work on Vercel
- You'll need to implement a Node.js alternative or use an external service

### API Routes Timeout

- Vercel has a 10-second timeout for Hobby plan
- Upgrade to Pro for 60-second timeout
- The `vercel.json` config sets maxDuration to 300 seconds for Pro plan

## Post-Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Database migrations run
- [ ] Clerk webhook configured
- [ ] Paystack webhook configured
- [ ] `NEXT_PUBLIC_APP_URL` updated to production domain
- [ ] Test user registration
- [ ] Test PDF upload (may need PDF conversion fix)
- [ ] Test payment flow
- [ ] Monitor error logs

## Need Help?

- Check Vercel logs: Project → Deployments → Click deployment → View Function Logs
- Check application logs in your API routes
- Review Vercel documentation: https://vercel.com/docs
