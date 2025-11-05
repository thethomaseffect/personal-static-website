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
const portfolioDataSrc = path.join(__dirname, '..', 'portfolio', 'public', 'data');
const portfolioDataDest = path.join(distDir, 'portfolio', 'data');
if (fs.existsSync(portfolioDataSrc)) {
  fs.ensureDirSync(portfolioDataDest);
  fs.copySync(portfolioDataSrc, portfolioDataDest);
  console.log('Portfolio data files copied');
}

// Copy for-sale data files to dist/for-sale
const forSaleDataSrc = path.join(__dirname, '..', 'for-sale', 'public', 'data');
const forSaleDataDest = path.join(distDir, 'for-sale', 'data');
if (fs.existsSync(forSaleDataSrc)) {
  fs.ensureDirSync(forSaleDataDest);
  fs.copySync(forSaleDataSrc, forSaleDataDest);
  console.log('For-sale data files copied');
}

// Create 404.html files for SPA routing in each subdirectory
// GitHub Pages will use these when a route doesn't exist, allowing React Router to handle it
// We copy index.html to 404.html so React Router can handle all routes
const portfolioIndexPath = path.join(distDir, 'portfolio', 'index.html');
const portfolio404Path = path.join(distDir, 'portfolio', '404.html');
const forSaleIndexPath = path.join(distDir, 'for-sale', 'index.html');
const forSale404Path = path.join(distDir, 'for-sale', '404.html');

// Copy index.html to 404.html in each subdirectory
if (fs.existsSync(portfolioIndexPath)) {
  fs.copyFileSync(portfolioIndexPath, portfolio404Path);
  console.log('Portfolio 404.html created');
}

if (fs.existsSync(forSaleIndexPath)) {
  fs.copyFileSync(forSaleIndexPath, forSale404Path);
  console.log('For-sale 404.html created');
}

