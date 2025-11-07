const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, '..', 'for-sale', 'public', 'images');

// Configuration (same as convert-and-resize-images.js)
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const QUALITY = 90; // PNG compression quality (0-100, higher = better quality but larger file)

async function resizePngImages() {
  try {
    // Read all PNG files
    const files = await fs.readdir(imagesDir);
    const pngFiles = files.filter(f => 
      f.endsWith('.png') && 
      f !== '.gitkeep'
    );
    
    console.log(`Found ${pngFiles.length} PNG files to resize`);
    
    if (pngFiles.length === 0) {
      console.log('No PNG files found to resize. Nothing to do.');
      return;
    }
    
    let totalOriginalSize = 0;
    let totalNewSize = 0;
    let resizedCount = 0;
    let skippedCount = 0;
    
    // Resize each image
    for (const pngFile of pngFiles) {
      const pngPath = path.join(imagesDir, pngFile);
      
      try {
        // Get original file size
        const originalStats = await fs.stat(pngPath);
        totalOriginalSize += originalStats.size;
        
        console.log(`Processing ${pngFile}...`);
        
        // Get image metadata
        const metadata = await sharp(pngPath).metadata();
        const width = metadata.width;
        const height = metadata.height;
        
        // Calculate new dimensions while maintaining aspect ratio
        let newWidth = width;
        let newHeight = height;
        
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          newWidth = Math.round(width * ratio);
          newHeight = Math.round(height * ratio);
          console.log(`  Resizing from ${width}x${height} to ${newWidth}x${newHeight}`);
        } else {
          console.log(`  Keeping original size ${width}x${height}`);
          skippedCount++;
          continue;
        }
        
        // Create a temporary file for the resized image
        const tempPath = path.join(imagesDir, `${pngFile}.tmp`);
        
        // Resize PNG
        await sharp(pngPath)
          .resize(newWidth, newHeight, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .png({ 
            quality: QUALITY,
            compressionLevel: 9 // Maximum compression
          })
          .toFile(tempPath);
        
        // Replace original with resized version
        await fs.move(tempPath, pngPath, { overwrite: true });
        
        // Get new file size
        const newStats = await fs.stat(pngPath);
        totalNewSize += newStats.size;
        resizedCount++;
        
        const sizeReduction = ((originalStats.size - newStats.size) / originalStats.size * 100).toFixed(1);
        console.log(`  ✓ Resized: ${(originalStats.size / 1024).toFixed(1)}KB → ${(newStats.size / 1024).toFixed(1)}KB (${sizeReduction}% ${sizeReduction > 0 ? 'reduction' : 'increase'})`);
        
      } catch (error) {
        console.error(`  ✗ Error processing ${pngFile}:`, error.message);
      }
    }
    
    console.log(`\nResize complete!`);
    console.log(`Files resized: ${resizedCount}`);
    console.log(`Files skipped (already small enough): ${skippedCount}`);
    console.log(`Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Total new size: ${(totalNewSize / 1024 / 1024).toFixed(2)}MB`);
    if (totalOriginalSize > 0) {
      console.log(`Overall size change: ${((totalNewSize - totalOriginalSize) / totalOriginalSize * 100).toFixed(1)}%`);
    }
    console.log('\nDone! All images resized.');
    
  } catch (error) {
    console.error('Error resizing images:', error);
    process.exit(1);
  }
}

resizePngImages();

