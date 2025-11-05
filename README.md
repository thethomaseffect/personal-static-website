# Personal Static Website

A personal static website deployed to GitHub Pages, featuring a portfolio and a for-sale section.

## Structure

- **Root (`/`)**: Simple landing page with links to portfolio and for-sale sections
- **Portfolio (`/portfolio`)**: React application showcasing work experience, programming projects, and creative works
- **For Sale (`/for-sale`)**: React application for displaying items for sale with categories, item listings, and detailed views

## Features

### Portfolio
- Multi-language support (English and Swedish)
- Social links section
- Work experience showcase
- Programming projects gallery
- Creative works gallery

### For Sale
- Multi-language support (English and Swedish)
- Category-based navigation
- Item listings with images
- Detailed item pages with image lightbox
- Price display in Swedish Krona (SEK)
- Terms and conditions section

## Development

### Prerequisites
- Node.js 20+
- npm

### Setup

1. Install root dependencies:
```bash
npm install
```

2. Install portfolio dependencies:
```bash
cd portfolio
npm install
```

3. Install for-sale dependencies:
```bash
cd for-sale
npm install
```

### Running Locally

**Portfolio:**
```bash
npm run dev:portfolio
```

**For Sale:**
```bash
npm run dev:for-sale
```

### Building

Build all applications:
```bash
npm run build
```

This will:
1. Build the portfolio app to `dist/portfolio/`
2. Build the for-sale app to `dist/for-sale/`
3. Copy the root `index.html` to `dist/`
4. Copy all data files to their respective locations

## Deployment

The site is automatically deployed to GitHub Pages using GitHub Actions on every push to the `main` branch.

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" under "Settings"
3. Set the source to "GitHub Actions"

The workflow will:
- Build both React applications
- Deploy to `thethomaseffect.github.io` (or your configured GitHub Pages domain)

## Data Files

All content is managed through JSON files:

### Portfolio
- `portfolio/public/data/content.json` - UI text and social links
- `portfolio/public/data/work-experience.json` - Work experience entries
- `portfolio/public/data/programming-projects.json` - Programming projects
- `portfolio/public/data/creative-works.json` - Creative works

### For Sale
- `for-sale/public/data/content.json` - UI text and terms
- `for-sale/public/data/categories.json` - Category definitions
- `for-sale/public/data/items.json` - Item listings

All JSON files support multi-language content using country codes (e.g., `en`, `sv`).

## Adding Items to For Sale

1. Edit `for-sale/public/data/items.json`
2. Add a new item with:
   - `id`: Unique integer
   - `categories`: Array of category IDs
   - `active`: `true` or `false` (set to `false` to hide)
   - `price`: Price in SEK
   - `images`: Array of image paths
   - `en` and `sv`: Language-specific content (title, description)

3. Place item images in `for-sale/public/images/`

## License

See LICENSE file for details.
