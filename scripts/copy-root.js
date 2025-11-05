const fs = require('fs-extra');
const path = require('path');

// Copy root index.html to dist folder
const distDir = path.join(__dirname, '..', 'dist');
const rootIndex = path.join(__dirname, '..', 'index.html');
const distIndex = path.join(distDir, 'index.html');

fs.ensureDirSync(distDir);
fs.copyFileSync(rootIndex, distIndex);
console.log('Root index.html copied to dist');

// Copy portfolio data files to dist/portfolio
// Note: This must happen AFTER the build to avoid interfering with the build output
const portfolioDataSrc = path.join(__dirname, '..', 'portfolio', 'public', 'data');
const portfolioDataDest = path.join(distDir, 'portfolio', 'data');
if (fs.existsSync(portfolioDataSrc)) {
  fs.ensureDirSync(portfolioDataDest);
  fs.copySync(portfolioDataSrc, portfolioDataDest);
  console.log('Portfolio data files copied');
} else {
  console.warn('Portfolio data source not found:', portfolioDataSrc);
}

// Copy for-sale data files to dist/for-sale
// Note: This must happen AFTER the build to avoid interfering with the build output
const forSaleDataSrc = path.join(__dirname, '..', 'for-sale', 'public', 'data');
const forSaleDataDest = path.join(distDir, 'for-sale', 'data');
if (fs.existsSync(forSaleDataSrc)) {
  fs.ensureDirSync(forSaleDataDest);
  fs.copySync(forSaleDataSrc, forSaleDataDest);
  console.log('For-sale data files copied');
} else {
  console.warn('For-sale data source not found:', forSaleDataSrc);
}

// Copy portfolio images to dist/portfolio
// Note: This must happen AFTER the build to avoid interfering with the build output
const portfolioImagesSrc = path.join(__dirname, '..', 'portfolio', 'public', 'images');
const portfolioImagesDest = path.join(distDir, 'portfolio', 'images');
if (fs.existsSync(portfolioImagesSrc)) {
  fs.ensureDirSync(portfolioImagesDest);
  fs.copySync(portfolioImagesSrc, portfolioImagesDest);
  console.log('Portfolio images copied');
} else {
  console.warn('Portfolio images source not found:', portfolioImagesSrc);
}

// Copy for-sale images to dist/for-sale
// Note: This must happen AFTER the build to avoid interfering with the build output
const forSaleImagesSrc = path.join(__dirname, '..', 'for-sale', 'public', 'images');
const forSaleImagesDest = path.join(distDir, 'for-sale', 'images');
if (fs.existsSync(forSaleImagesSrc)) {
  fs.ensureDirSync(forSaleImagesDest);
  fs.copySync(forSaleImagesSrc, forSaleImagesDest);
  console.log('For-sale images copied');
} else {
  console.warn('For-sale images source not found:', forSaleImagesSrc);
}

// Create 404.html files for SPA routing in each subdirectory
// GitHub Pages will use these when a route doesn't exist, allowing React Router to handle it
// We copy index.html to 404.html so React Router can handle all routes
const portfolioIndexPath = path.join(distDir, 'portfolio', 'index.html');
const portfolio404Path = path.join(distDir, 'portfolio', '404.html');
const forSaleIndexPath = path.join(distDir, 'for-sale', 'index.html');
const forSale404Path = path.join(distDir, 'for-sale', '404.html');

// Copy index.html to 404.html in each subdirectory
// This allows GitHub Pages to serve the React app for all routes
if (fs.existsSync(portfolioIndexPath)) {
  fs.copyFileSync(portfolioIndexPath, portfolio404Path);
  console.log('Portfolio 404.html created');
} else {
  console.error('Portfolio index.html not found at:', portfolioIndexPath);
  console.error('Build may have failed or output directory is incorrect');
}

if (fs.existsSync(forSaleIndexPath)) {
  fs.copyFileSync(forSaleIndexPath, forSale404Path);
  console.log('For-sale 404.html created');
} else {
  console.error('For-sale index.html not found at:', forSaleIndexPath);
  console.error('Build may have failed or output directory is incorrect');
}

