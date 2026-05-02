#!/usr/bin/env node

/**
 * Update Image URLs Script
 * Replace local image paths with Supabase CDN URLs
 * 
 * Usage:
 * 1. Update SUPABASE_CONFIG below with your values
 * 2. Run: node update-image-urls.js
 */

const fs = require('fs');
const path = require('path');

// ==================== CONFIGURATION ====================
const SUPABASE_CONFIG = {
  // Get your project ID from Supabase dashboard
  projectId: 'YOUR_PROJECT_ID', // Replace with your Supabase project ID
  
  // Get your URL from Supabase Settings → API
  supabaseUrl: 'https://YOUR_PROJECT_ID.supabase.co',
  
  // The bucket name we created
  bucketName: 'assets'
};

// Versions to update
const VERSIONS = ['basic', 'standard', 'premium'];

// ==================== HELPER FUNCTIONS ====================

function generateSupabaseUrl(filename) {
  return `${SUPABASE_CONFIG.supabaseUrl}/storage/v1/object/public/${SUPABASE_CONFIG.bucketName}/images/${filename}`;
}

function updateHtmlFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Pattern to match /assets/images/FILENAME.jpg
    const imagePattern = /\/assets\/images\/([^"']+\.(jpg|jpeg|png|gif|webp))/gi;
    
    // Replace all occurrences
    content = content.replace(imagePattern, (match, filename) => {
      const supabaseUrl = generateSupabaseUrl(filename);
      console.log(`  ✓ ${filename} → Supabase URL`);
      return supabaseUrl;
    });
    
    // Write back if changed
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// ==================== MAIN EXECUTION ====================

console.log('🚀 Supabase Image URL Updater\n');
console.log('Configuration:');
console.log(`  Project URL: ${SUPABASE_CONFIG.supabaseUrl}`);
console.log(`  Bucket: ${SUPABASE_CONFIG.bucketName}`);
console.log(`  Project ID: ${SUPABASE_CONFIG.projectId}\n`);

// Validate configuration
if (SUPABASE_CONFIG.projectId === 'YOUR_PROJECT_ID') {
  console.error('❌ ERROR: Please update SUPABASE_CONFIG.projectId in this script');
  console.error('   Find your project ID in Supabase dashboard URL or Settings → API\n');
  process.exit(1);
}

let totalUpdated = 0;

// Update each version
VERSIONS.forEach(version => {
  const htmlPath = path.join(__dirname, version, 'index.html');
  
  if (fs.existsSync(htmlPath)) {
    console.log(`📄 Updating ${version}/index.html...`);
    if (updateHtmlFile(htmlPath)) {
      totalUpdated++;
      console.log(`   ✅ Successfully updated\n`);
    } else {
      console.log(`   ℹ️  No changes needed\n`);
    }
  } else {
    console.log(`   ⚠️  File not found: ${version}/index.html\n`);
  }
});

console.log(`✅ Update complete! (${totalUpdated} file(s) modified)\n`);
console.log('Next steps:');
console.log('1. Test the website to ensure all images load from Supabase');
console.log('2. Check browser console for any 404 errors');
console.log('3. Commit changes: git add . && git commit -m "Update image URLs to Supabase"');
console.log('4. Push to GitHub: git push\n');

// ==================== ROLLBACK INSTRUCTIONS ====================
console.log('To rollback to local images later:');
console.log('Run: git checkout HEAD -- basic/index.html standard/index.html premium/index.html\n');
