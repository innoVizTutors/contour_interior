# Vercel Deployment Guide

## Step 1: Prepare Your Project

### A. Create `.gitignore`
Make sure a `.gitignore` file exists in your root directory:
```
node_modules/
.env
.env.local
.DS_Store
*.log
dist/
build/
```

### B. Create `vercel.json` 
This file is already provided in your project root.

### C. Initialize Git (if not done)
```bash
cd c:\Users\mr.Zaaks-WPC\Documents\Freelance\contours_bundle
git init
git add .
git commit -m "Initial commit - ready for Vercel deployment"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Create a new repository:
   - **Name**: contours-bundle (or your preference)
   - **Privacy**: Public
   - **Do NOT** initialize with README/gitignore
   - Click **"Create repository"**

3. Push your local code to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/contours-bundle.git
git branch -M main
git push -u origin main
```

## Step 3: Setup Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Click **"Sign Up"** (sign up with GitHub for easier integration)
3. Authorize Vercel to access your GitHub account
4. Click **"Import Project"**
5. Select your **contours-bundle** repository from GitHub
6. Configure:
   - **Framework Preset**: Other (since it's static HTML/CSS/JS)
   - **Root Directory**: `./basic` (or `./standard` / `./premium` depending on which version)
   - **Build Command**: Leave empty (static files)
   - **Output Directory**: Leave empty
   - **Environment Variables**: Leave empty
7. Click **"Deploy"**

**Deploy takes ~1-2 minutes. You'll get a URL like:**
```
https://contours-bundle.vercel.app
```

## Step 4: Deploy All Three Versions (Optional)

To deploy all versions (basic, standard, premium):

### Create separate projects for each:

**Option 1: Multiple Vercel Projects** (Recommended)
1. In Vercel dashboard, click **"Add New"** → **"Project"**
2. Import same repository
3. Change **Root Directory** to `./standard`
4. Deploy with URL: `https://contours-standard.vercel.app`
5. Repeat for `premium`

**Option 2: Single Project with Routes** (Advanced)
Modify `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/standard/(.*)", "destination": "/standard/$1" },
    { "source": "/premium/(.*)", "destination": "/premium/$1" },
    { "source": "/(.*)", "destination": "/basic/$1" }
  ]
}
```

## Step 5: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain (e.g., contours-design.com)
3. Vercel will provide nameservers
4. Update your domain registrar's DNS settings
5. Wait for DNS propagation (up to 48 hours)

## Step 6: Setup Auto-Deployments

By default, Vercel auto-deploys when you push to `main` branch:

### To deploy without automatic deployment:
1. Push changes to a separate branch
2. Create a Pull Request
3. Vercel automatically creates a Preview Deployment
4. Merge to `main` to trigger Production Deployment

## Step 7: Monitor Your Deployment

**Vercel Dashboard allows you to:**
- View deployment logs
- Monitor performance and analytics
- See bandwidth usage
- Configure environment variables
- Set up monitoring and alerts

## Vercel Free Tier Limits

✅ **Included:**
- Unlimited sites
- Unlimited deployments
- 100 GB bandwidth per month
- Global CDN
- Automatic HTTPS
- Git integration
- Preview deployments

⚠️ **Limits:**
- Bandwidth: 100 GB/month (resets monthly)
- Function execution: 100 hours/month (if using serverless functions)
- Storage: Not included (use Supabase for assets)

## Troubleshooting

**Domain not resolving?**
- DNS changes can take 48 hours
- Check Vercel DNS status in dashboard
- Verify nameservers updated at registrar

**Images not loading after deployment?**
- Verify Supabase URLs are correct
- Check CORS settings in Supabase
- Open browser DevTools → Network tab for 404s

**Deployment failed?**
- Check Vercel build logs
- Ensure no missing dependencies
- Verify HTML files reference correct paths

## Maintenance

**To update your site:**
1. Make changes locally
2. Commit: `git add . && git commit -m "Update description"`
3. Push: `git push`
4. Vercel automatically deploys within seconds

**To rollback:**
1. Go to Vercel dashboard
2. Find previous deployment
3. Click the ⋮ menu
4. Select **"Promote to Production"**

## Next Steps

1. ✅ Images uploaded to Supabase
2. ✅ Website deployed to Vercel
3. Consider: Setting up analytics, SEO optimization, email automation
