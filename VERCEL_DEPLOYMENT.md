# Deploy to Vercel - Step by Step Guide

## Prerequisites
- Your code should be pushed to GitHub (see GITHUB_SETUP.md if not done)
- A GitHub account
- A Vercel account (free tier is sufficient)

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Create Vercel Account
1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Log In"**
3. Sign in with your **GitHub** account (recommended for easy integration)

### Step 2: Import Your Repository
1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find and select your **portfolio** repository
4. Click **"Import"**

### Step 3: Configure Project Settings
Vercel will auto-detect Next.js, but verify these settings:

**Framework Preset:** Next.js (should be auto-detected)

**Root Directory:** `./` (leave as default)

**Build Command:** `npm run build` (auto-filled)

**Output Directory:** `.next` (auto-filled)

**Install Command:** `npm install` (auto-filled)

### Step 4: Environment Variables (if needed)
- If you add any environment variables later, you can add them here
- For now, you don't need any

### Step 5: Deploy
1. Click **"Deploy"** button
2. Wait for the build to complete (usually 1-2 minutes)
3. Once deployed, you'll get a URL like: `https://your-project-name.vercel.app`

### Step 6: Custom Domain (Optional)
1. Go to your project dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `mohanamoganti.com`)
4. Follow the DNS configuration instructions

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
This will open a browser window for authentication.

### Step 3: Deploy
```bash
vercel
```
Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No (for first deployment)
- **Project name?** → Enter a name or press Enter for default
- **Directory?** → `./` (press Enter)
- **Override settings?** → No (press Enter)

### Step 4: Production Deploy
For production deployment:
```bash
vercel --prod
```

## Post-Deployment

### Automatic Deployments
- Every push to your `main` branch will automatically trigger a new deployment
- Pull requests will create preview deployments

### Viewing Deployments
1. Go to your Vercel dashboard
2. Click on your project
3. You'll see all deployments with their status

### Updating Your Site
1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```
3. Vercel will automatically deploy the changes

## Troubleshooting

### Build Fails
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18+ by default)

### Environment Variables
- If you add `.env` variables, add them in Vercel dashboard:
  - Project → Settings → Environment Variables

### Image Optimization
- Vercel automatically optimizes Next.js images
- Ensure images are in the `public` folder

## Useful Vercel Features

1. **Preview Deployments**: Every PR gets a preview URL
2. **Analytics**: Enable in project settings
3. **Speed Insights**: Monitor performance
4. **Edge Functions**: For serverless functions

## Quick Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List all deployments
vercel ls
```


