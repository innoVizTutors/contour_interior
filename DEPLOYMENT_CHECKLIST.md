# Deployment Checklist

## ✅ Pre-Deployment Tasks

### Local Setup
- [ ] All dropdown fixes applied to all 3 versions
- [ ] `.gitignore` file created
- [ ] `vercel.json` created
- [ ] Update script (`update-image-urls.js`) configured
- [ ] Git initialized locally

### Assets Management
- [ ] All 6 images confirmed in `assets/images/`:
  - [ ] home.jpg
  - [ ] 1.jpg
  - [ ] 2.jpg
  - [ ] 3.jpg
  - [ ] 4.jpg
  - [ ] 5.jpg

---

## 🌐 Phase 1: Supabase Setup (10 minutes)

### Account Creation
- [ ] Visit https://supabase.com
- [ ] Sign up with email or GitHub
- [ ] Create new project
- [ ] Wait for project to initialize (2-3 minutes)

### Storage Setup
- [ ] Navigate to Storage in sidebar
- [ ] Create new bucket named: `assets`
- [ ] Toggle "Public bucket" to ON
- [ ] Confirm bucket created

### Image Upload
- [ ] Create `images` folder inside `assets` bucket
- [ ] Upload all 6 images to `images` folder:
  - [ ] home.jpg
  - [ ] 1.jpg
  - [ ] 2.jpg
  - [ ] 3.jpg
  - [ ] 4.jpg
  - [ ] 5.jpg
- [ ] Verify all files uploaded successfully

### Configuration Retrieval
- [ ] Go to Settings → API
- [ ] Copy Project URL (e.g., `https://abc123.supabase.co`)
- [ ] Extract Project ID (the part before `.supabase.co`)
- [ ] Copy anon public API key (for future reference)
- [ ] Save to `CONFIGURATION_REFERENCE.md`

### Test Supabase URLs
- [ ] Test one image URL in browser:
  ```
  https://[PROJECT_ID].supabase.co/storage/v1/object/public/assets/images/home.jpg
  ```
- [ ] Image loads successfully
- [ ] No errors in browser console

---

## 🔧 Phase 2: Update Website URLs (5 minutes)

### Script Configuration
- [ ] Open `update-image-urls.js`
- [ ] Replace `YOUR_PROJECT_ID` with your actual Project ID
- [ ] Replace `YOUR_PROJECT_ID` in supabaseUrl
- [ ] Save file

### Run Update Script
```bash
cd c:\Users\mr.Zaaks-WPC\Documents\Freelance\contours_bundle
node update-image-urls.js
```
- [ ] Script runs without errors
- [ ] Shows "Update complete" message

### Verify HTML Updates
- [ ] Open `basic/index.html`
- [ ] Verify image URLs now start with `https://[PROJECT_ID].supabase.co`
- [ ] Check all 6 images have been updated
- [ ] Same for `standard/index.html` and `premium/index.html`

### Local Testing
```bash
cd basic
python -m http.server 8000
```
- [ ] Visit http://localhost:8000
- [ ] All images display correctly
- [ ] Open DevTools → Network tab
- [ ] All images show status 200
- [ ] No 404 errors from supabase.co

---

## 📚 Phase 3: GitHub Setup (10 minutes)

### Initialize Local Git
```bash
cd c:\Users\mr.Zaaks-WPC\Documents\Freelance\contours_bundle
git init
git add .
git commit -m "Initial commit - Contour Interior Design website"
```
- [ ] Git initialized successfully
- [ ] All files committed

### Create GitHub Repository
- [ ] Visit https://github.com/new
- [ ] Repository name: `contours-bundle`
- [ ] Description: `Contour Interior Design - Professional wallpapering & design`
- [ ] Privacy: Public
- [ ] Click "Create repository"

### Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/contours-bundle.git
git branch -M main
git push -u origin main
```
- [ ] Push completes successfully
- [ ] Visit GitHub repo to verify files are there
- [ ] All commits visible in history

---

## 🚀 Phase 4: Vercel Deployment (5 minutes)

### Vercel Account Setup
- [ ] Visit https://vercel.com
- [ ] Sign up (recommended: use GitHub)
- [ ] Authorize Vercel to access GitHub account

### Import Project
- [ ] Click "Import Project" in Vercel dashboard
- [ ] Select `contours-bundle` repository
- [ ] Click "Import"

### Configure Deployment
- [ ] Framework Preset: `Other` (static site)
- [ ] Root Directory: `./basic` (or your preferred version)
- [ ] Build Command: Leave empty
- [ ] Output Directory: Leave empty
- [ ] Environment Variables: Leave empty
- [ ] Click "Deploy"

### Deployment Complete
- [ ] Deployment completes (1-2 minutes)
- [ ] Get production URL (e.g., `https://contours-bundle.vercel.app`)
- [ ] Copy URL and save to `CONFIGURATION_REFERENCE.md`

---

## ✨ Phase 5: Verification & Testing (5 minutes)

### Live Website Check
- [ ] Visit your Vercel URL
- [ ] Page loads completely
- [ ] All images display correctly
- [ ] Page is responsive (test on mobile)

### Performance & Errors
- [ ] Open DevTools → Network tab
- [ ] Reload page
- [ ] All images show status 200
- [ ] Images load from `supabase.co` domain
- [ ] No 404 or CORS errors
- [ ] Console has no errors

### Functionality Test
- [ ] All links work
- [ ] Navigation menu works
- [ ] Scrolling smooth
- [ ] Contact form displays correctly
- [ ] Responsive design works on mobile/tablet

### DNS & Domain (Optional)
- [ ] If using custom domain, update DNS:
  - [ ] Copy Vercel nameservers from Settings → Domains
  - [ ] Update domain registrar DNS
  - [ ] Wait for propagation (up to 48 hours)

---

## 📊 Post-Deployment

### Documentation
- [ ] Save Project ID, URLs to `CONFIGURATION_REFERENCE.md`
- [ ] Document any custom setup steps
- [ ] Note credentials location (password manager)

### Monitoring
- [ ] Set up Vercel analytics
- [ ] Check Supabase dashboard monthly for bandwidth usage
- [ ] Monitor for errors in Vercel logs

### Future Updates
- [ ] Make changes locally
- [ ] Commit: `git add . && git commit -m "message"`
- [ ] Push: `git push`
- [ ] Vercel auto-deploys within 30-60 seconds

### Image Management
- [ ] If replacing images:
  1. Delete old image in Supabase
  2. Upload new image with same filename
  3. Supabase CDN updates automatically
  4. No code changes needed

---

## 🎯 All Done! You Now Have:

✅ Website hosted on Vercel (free tier, worldwide CDN)
✅ Images hosted on Supabase (fast, global distribution)
✅ Automatic deployments (push to GitHub = auto-deploy)
✅ SSL/HTTPS (automatic from both platforms)
✅ Auto-scaling (handles traffic spikes)
✅ $0/month cost (free tier for both)

---

## 🆘 Troubleshooting Quick Links

- Images not showing: See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md#troubleshooting)
- Deployment failed: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md#troubleshooting)
- Need detailed guide: See [QUICK_START.md](./QUICK_START.md)
- Configuration help: See [CONFIGURATION_REFERENCE.md](./CONFIGURATION_REFERENCE.md)

---

**Estimated total time: 30-45 minutes**
**Difficulty: Beginner-friendly**
**Cost: $0/month**
