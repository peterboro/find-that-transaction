# Troubleshooting Vercel Deployment Issues

## Common Errors and Solutions

### 1. MIDDLEWARE_INVOCATION_FAILED (500 Error)

**Error:** `500: INTERNAL_SERVER_ERROR Code: MIDDLEWARE_INVOCATION_FAILED`

**Causes:**
- Missing Clerk environment variables
- Incorrect Clerk API keys
- Middleware trying to access resources not available in Edge runtime

**Solutions:**

1. **Verify Clerk Environment Variables in Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Ensure these are set:
     - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_`)
     - `CLERK_SECRET_KEY` (starts with `sk_`)
   - Make sure they're set for **Production**, **Preview**, and **Development** environments

2. **Check Clerk Keys:**
   - Go to https://dashboard.clerk.com
   - Select your application
   - Go to **API Keys** section
   - Copy the correct keys:
     - **Publishable Key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
     - **Secret Key** → `CLERK_SECRET_KEY`
   - **Important:** Use production keys for production deployment, not test keys

3. **Verify Key Format:**
   - Publishable key should start with `pk_live_` (production) or `pk_test_` (development)
   - Secret key should start with `sk_live_` (production) or `sk_test_` (development)

4. **Redeploy After Adding Variables:**
   - After adding/updating environment variables, you must redeploy
   - Go to Deployments → Click the three dots → Redeploy

### 2. Database Connection Errors

**Error:** `PrismaClientInitializationError` or database connection timeouts

**Solutions:**
- Verify `DATABASE_URL` is set correctly in Vercel
- Ensure your database allows connections from Vercel IPs
- Check that SSL is enabled: `?sslmode=require` in your connection string
- For Neon/Supabase, make sure you're using the connection pooler URL

### 3. PDF Conversion Errors

**Error:** `PDF conversion failed` or `pdf2image not installed`

**Solution:**
- The Python-based PDF conversion won't work on Vercel
- You need to replace it with a Node.js solution or external service
- See DEPLOYMENT.md for alternatives

### 4. API Route Timeouts

**Error:** Function execution timeout

**Solutions:**
- Vercel Hobby plan has 10-second timeout
- Upgrade to Pro plan for 60-second timeout (or 300 seconds with configuration)
- Optimize your API routes to complete faster
- The `vercel.json` already configures 300 seconds for the parse-statement route (Pro plan only)

### 5. Webhook Errors

**Error:** Webhook verification failed

**Solutions:**
- Ensure `CLERK_WEBHOOK_SECRET` is set in Vercel
- Verify webhook URL in Clerk dashboard matches your Vercel domain
- Check that webhook events are subscribed correctly

### 6. Build Failures

**Error:** Build fails during deployment

**Solutions:**
- Check build logs in Vercel dashboard
- Ensure `package.json` has correct scripts
- Verify all dependencies are listed in `package.json`
- Check that Prisma generates correctly (should happen in `postinstall` script)

## Debugging Steps

1. **Check Vercel Logs:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the failed deployment
   - Check "Function Logs" and "Build Logs"

2. **Verify Environment Variables:**
   - Settings → Environment Variables
   - Ensure all required variables are set
   - Check they're enabled for the correct environments

3. **Test Locally:**
   - Copy all environment variables to `.env.local`
   - Run `npm run build` locally
   - If it fails locally, fix the issue before deploying

4. **Check Clerk Dashboard:**
   - Verify your application is active
   - Check API keys are correct
   - Ensure webhooks are configured

## Quick Checklist

- [ ] All environment variables set in Vercel
- [ ] Clerk keys are production keys (not test keys)
- [ ] Database URL is correct and accessible
- [ ] Webhook URLs match your Vercel domain
- [ ] Build completes successfully
- [ ] No TypeScript errors
- [ ] Prisma generates correctly

## Getting Help

1. Check Vercel deployment logs
2. Check browser console for client-side errors
3. Check Vercel function logs for server-side errors
4. Review this troubleshooting guide
5. Check DEPLOYMENT.md for setup instructions
