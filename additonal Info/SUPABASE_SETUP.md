# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up (free tier available)
2. Click **"New Project"**
3. Configure:
   - **Name**: contours-design (or your preferred name)
   - **Database Password**: Create a strong password and save it
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is sufficient
4. Click **"Create new project"** and wait for setup (2-3 minutes)

## Step 2: Create Storage Bucket
 
Once your project is ready:

1. Navigate to **Storage** in the left sidebar
2. Click **"Create a new bucket"**
3. Configure:
   - **Bucket name**: `assets` (important - use lowercase)
   - **Public bucket**: Toggle **ON** (required to serve images publicly)
4. Click **"Create bucket"**

## Step 3: Upload Images to Supabase

You have two options:

### Option A: Upload via Web Console (Recommended for beginners)
1. Click on the **`assets`** bucket
2. Click **"Upload file"**
3. Select all images from `assets/images/`:
   - 1.jpg
   - 2.jpg
   - 3.jpg
   - 4.jpg
   - 5.jpg
   - home.jpg
4. Create a folder structure: Create an **`images`** folder and upload images there

### Option B: Use Supabase CLI (Advanced)
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Upload files from images folder
supabase storage upload assets/images/* -r /images --project-id YOUR_PROJECT_ID
```

## Step 4: Get Your Supabase URLs

1. Go to **Settings** → **API**
2. Find your **Project URL** (looks like: `https://[project-id].supabase.co`)
3. Find your **anon public** API key
4. Save these values

'''
prkeyhttps://exjymvnpdygmbxgzpjas.supabase.co
pukeysb_publishable_6Xm5Zyr0eMKVrFbSl4i-TQ_tnYyOu6b
sekeysb_secret_74NYc4w-AHP-wTwAvL-y6A_B3JsdOUu
'''

## Step 5: Generate Image URLs

Your image URLs will follow this pattern:
```
https://[project-id].supabase.co/storage/v1/object/public/assets/images/[filename]
```

Example for home.jpg:
```
https://abc123xyz.supabase.co/storage/v1/object/public/assets/images/home.jpg
```

## Step 6: Update Website

Replace all image paths in your HTML files:

**Old format:**
```html
<img src="/assets/images/home.jpg" alt="...">
```

**New format:**
```html
<img src="https://[YOUR-PROJECT-ID].supabase.co/storage/v1/object/public/assets/images/home.jpg" alt="...">
```

### Automated Approach (Recommended)

Create a `config.js` to manage Supabase URLs:

```javascript
// supabase-config.js
const SUPABASE_URL = 'https://abc123xyz.supabase.co';
const SUPABASE_STORAGE_BUCKET = 'assets';

function getImageUrl(filename) {
  return `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_STORAGE_BUCKET}/images/${filename}`;
}

// Usage in HTML:
// <img src="https://abc123xyz.supabase.co/storage/v1/object/public/assets/images/home.jpg">
// Or in JavaScript:
// const homeImg = getImageUrl('home.jpg');
```

## Step 7: Test Images

1. Visit your Supabase image URL in browser to verify it loads
2. Check that images display correctly on your website
3. Open DevTools to ensure no 404 errors

## Security Notes

- ✅ Free tier is sufficient for small to medium projects
- ✅ Public bucket is fine for images
- ✅ Keep API keys safe - never commit them to git
- ✅ No API key needed for public bucket reads

## Troubleshooting

**Images not showing?**
- Verify bucket is set to public
- Check URL format matches exactly
- Ensure file names match (case-sensitive)
- Check browser console for 404 errors

**Need to delete/replace images?**
- Go to Storage → assets → images
- Click the file menu (⋮) and select Delete/Replace
- Re-upload the correct file

## Next Steps
After confirming images work with Supabase URLs, proceed with Vercel deployment.
