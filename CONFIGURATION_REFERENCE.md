# Environment & Configuration Reference

## Supabase Configuration

When you complete Supabase setup, you'll have:

```
PROJECT_ID: [your-project-id from dashboard]
SUPABASE_URL: https://[PROJECT_ID].supabase.co
STORAGE_BUCKET: assets
```

## Image URL Format

All images will be accessed via:
```
https://[PROJECT_ID].supabase.co/storage/v1/object/public/assets/images/[filename]
```

### Examples

If your Project ID is: `abc123xyz`

Then your URLs are:
```
home.jpg     → https://abc123xyz.supabase.co/storage/v1/object/public/assets/images/home.jpg
1.jpg        → https://abc123xyz.supabase.co/storage/v1/object/public/assets/images/1.jpg
2.jpg        → https://abc123xyz.supabase.co/storage/v1/object/public/assets/images/2.jpg
3.jpg        → https://abc123xyz.supabase.co/storage/v1/object/public/assets/images/3.jpg
4.jpg        → https://abc123xyz.supabase.co/storage/v1/object/public/assets/images/4.jpg
5.jpg        → https://abc123xyz.supabase.co/storage/v1/object/public/assets/images/5.jpg
```

## Vercel Configuration

### Deployment URLs

After deploying to Vercel, you get:
```
PRODUCTION: https://contours-bundle.vercel.app
```

To deploy all versions:
```
Basic:     https://contours-bundle.vercel.app (or use custom domain)
Standard:  https://contours-bundle-standard.vercel.app
Premium:   https://contours-bundle-premium.vercel.app
```

## GitHub Configuration

Your repository will be:
```
https://github.com/YOUR_USERNAME/contours-bundle
```

## Setup Checklist

- [ ] Supabase Project ID: _______________
- [ ] Supabase URL: _______________
- [ ] Images uploaded to Supabase: ✓/✗
- [ ] Image URLs tested: ✓/✗
- [ ] GitHub username: _______________
- [ ] GitHub repo created: ✓/✗
- [ ] Vercel project created: ✓/✗
- [ ] Vercel deployment URL: _______________

## Quick Reference

### Update script configuration
Edit `update-image-urls.js`:
```javascript
projectId: 'YOUR_PROJECT_ID',  // ← Your Supabase Project ID
supabaseUrl: 'https://YOUR_PROJECT_ID.supabase.co'  // ← Full URL
```

### Git commands
```bash
git init                              # Initialize git
git add .                             # Stage changes
git commit -m "Initial commit"        # Create commit
git remote add origin <URL>           # Link to GitHub
git push -u origin main               # Push to GitHub
```

### Run locally
```bash
cd basic
python -m http.server 8000
# Visit: http://localhost:8000
```

## Free Tier Limits (Important!)

### Supabase
- Storage: 5 GB
- Bandwidth: 250 MB/month
- (Auto-upgrades if exceeded, extra charges apply)

### Vercel
- Bandwidth: 100 GB/month
- Deployments: Unlimited
- Functions: 100 GB-hours/month (not used in static site)
- (Generous free tier - rarely hit limits for small sites)

## Important: Do NOT Commit These

Make sure `.gitignore` includes:
```
node_modules/
.env
.env.local
```

Keep API keys and sensitive data out of git!
