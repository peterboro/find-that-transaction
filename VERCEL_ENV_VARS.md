# Vercel Environment Variables Checklist

Copy and paste these into Vercel's Environment Variables section (Settings → Environment Variables).

## Required Variables

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

# App URL (update after deployment)
NEXT_PUBLIC_APP_URL=https://yourproject.vercel.app
```

## Optional Variables

```bash
# Paystack Plan Codes (if using subscriptions)
PAYSTACK_PRO_PLAN_CODE=PLN_...
PAYSTACK_BUSINESS_PLAN_CODE=PLN_...
```

## Important Notes

1. **Use Production Keys**: Replace test keys (`pk_test_`, `sk_test_`) with production keys (`pk_live_`, `sk_live_`)
2. **Set for All Environments**: When adding variables, select:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
3. **Update App URL**: After first deployment, update `NEXT_PUBLIC_APP_URL` to your actual Vercel domain
4. **Keep Secrets Safe**: Never commit these to Git. They're already in `.gitignore`

## Where to Get Each Key

- **Clerk**: https://dashboard.clerk.com → Your App → API Keys
- **Database**: Your Neon/Supabase dashboard → Connection String
- **Cloudinary**: https://cloudinary.com/console → Dashboard
- **Gemini**: https://aistudio.google.com/app/apikey
- **Paystack**: https://dashboard.paystack.com → Settings → API Keys & Webhooks
