# Quick Start: Supabase + Vercel Deployment

## Overview
- **Supabase**: Cloud storage for your images (free tier: 5GB storage, 250MB/month bandwidth)
- **Vercel**: Website hosting (free tier: unlimited deployments, 100GB bandwidth/month)

---

## ⏱️ Timeline: ~30-45 minutes total

### Phase 1: Supabase Setup (10 minutes)
- Create Supabase account
- Upload images
- Get your Project ID

### Phase 2: Update URLs (5 minutes)
- Run the update script
- Test locally

### Phase 3: GitHub Setup (10 minutes)
- Initialize Git
- Create GitHub repo
- Push code

### Phase 4: Vercel Deployment (5 minutes)
- Connect to Vercel
- Deploy

### Phase 5: Verification (5 minutes)
- Test live website
- Verify images load

---

## Phase 1️⃣: Supabase Account Setup

```
1. Visit https://supabase.com
2. Click "Sign Up" (free tier)
3. Create account (email or GitHub)
4. Create new project:
   - Name: "contours-design"
   - Password: [strong password]
   - Region: [closest to you]
   - Plan: Free
5. Wait 2-3 minutes for setup
```

## Phase 2️⃣: Create Storage Bucket & Upload Images

```
1. In Supabase: Storage → Create a new bucket
   - Name: "assets"
   - Toggle: "Public bucket" = ON
2. Upload images:
   - Open bucket
   - Create folder: "images"
   - Upload: 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg, home.jpg
```

## Phase 3️⃣: Get Your Configuration

**In Supabase Dashboard:**
1. Settings → API
2. Copy your **Project URL** (looks like `https://abc123.supabase.co`)
3. Extract your **Project ID** from URL (the part before `.supabase.co`)

Example:
```
URL: https://abc123xyz.supabase.co
Project ID: abc123xyz
```

## Phase 4️⃣: Update Image URLs

Open `update-image-urls.js` and replace:
```javascript
projectId: 'YOUR_PROJECT_ID',  // ← Replace with your actual project ID
supabaseUrl: 'https://YOUR_PROJECT_ID.supabase.co'  // ← Replace
```

Then run:
```bash
cd c:\Users\mr.Zaaks-WPC\Documents\Freelance\contours_bundle
node update-image-urls.js
```

Expected output:
```
🚀 Supabase Image URL Updater

✓ home.jpg → Supabase URL
✓ 1.jpg → Supabase URL
✓ 2.jpg → Supabase URL
...
✅ Update complete! (3 file(s) modified)
```

## Phase 5️⃣: Test Locally

```bash
# Test basic version locally
cd basic
python -m http.server 8000

# Visit http://localhost:8000
# Verify all images load (they should be from Supabase now)
# Check browser console for errors
```

## Phase 6️⃣: GitHub Setup

```bash
# Navigate to your project
cd c:\Users\mr.Zaaks-WPC\Documents\Freelance\contours_bundle

# Initialize git
git init
git add .
git commit -m "Initial commit - ready for deployment"

# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/contours-bundle.git
git branch -M main
git push -u origin main
```

## Phase 7️⃣: Deploy to Vercel

```
1. Visit https://vercel.com
2. Sign up (use GitHub for easier setup)
3. Click "Import Project"
4. Select your "contours-bundle" repo
5. Configure:
   - Framework: Other (static HTML)
   - Root Directory: ./basic
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
6. Click "Deploy"
7. Wait ~1-2 minutes
8. Get your live URL: https://contours-bundle.vercel.app
```

## Phase 8️⃣: Verify Deployment

```
1. Visit your Vercel URL
2. Check all images load correctly
3. Browser DevTools → Network tab:
   - Images should show status: 200
   - From supabase.co domain
4. No console errors
```

---

## 🎯 What You Now Have

✅ **Images**: Hosted on Supabase CDN (globally distributed)
✅ **Website**: Hosted on Vercel (with auto-updates)
✅ **Domain**: www.contours-bundle.vercel.app
✅ **SSL/HTTPS**: Automatic (Vercel provides free certificates)
✅ **CDN**: Global delivery (both Supabase and Vercel have CDNs)

---

## 📋 Checklist

- [ ] Supabase account created
- [ ] Storage bucket created and made public
- [ ] Images uploaded to Supabase
- [ ] `update-image-urls.js` configured with your Project ID
- [ ] URLs updated (ran the script)
- [ ] Tested locally and images load from Supabase
- [ ] Git initialized and committed
- [ ] GitHub repo created
- [ ] Code pushed to GitHub
- [ ] Vercel connected to GitHub
- [ ] Website deployed to Vercel
- [ ] Live website tested and verified

---

## 🚀 Automated Future Updates

After initial setup, updates are automatic:

```bash
# Make changes to HTML/CSS
# Commit and push
git add .
git commit -m "Update content"
git push

# Vercel automatically deploys within 30-60 seconds!
# No manual action needed
```

---

## 📚 Full Guides

For detailed information, see:
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Complete Supabase walkthrough
- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Complete Vercel guide

---

## ❓ Troubleshooting

**Q: Images not showing on live site?**
A: Check DevTools → Network tab. If 404 error from supabase.co:
   - Verify images uploaded to Supabase
   - Confirm bucket is PUBLIC
   - Check Project ID is correct in update script

**Q: How to change images later?**
A: 
   1. In Supabase, delete old image
   2. Upload new image with same filename
   3. Website automatically shows new image (CDN updates)

**Q: How much does this cost?**
A: **$0/month** (both Supabase and Vercel free tiers are generous)

**Q: Can I use custom domain?**
A: Yes! Vercel Settings → Domains (both free and paid domains supported)

---

## 💡 Pro Tips

1. **Monitor bandwidth**: Supabase gives 250MB/month free (upgrades auto if exceeded)
2. **Performance**: Both services use CDNs, so images load fast globally
3. **Backups**: Keep local copy of images - always have redundancy
4. **Analytics**: Vercel dashboard shows traffic and performance metrics
5. **Rollback**: If needed, just do `git revert` and push

---

## 📞 Support

- Supabase Issues: https://supabase.com/docs
- Vercel Issues: https://vercel.com/docs
- GitHub Help: https://docs.github.com

Good luck! 🎉
