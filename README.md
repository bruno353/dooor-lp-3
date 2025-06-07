# Dooor Website

A modern, responsive website for Dooor - AI solutions for healthcare built with Next.js 14 and Tailwind CSS.

## Features

- 🏥 **Healthcare-focused Design**: Clean, professional layout inspired by leading healthcare technology companies
- ⚡ **Next.js 14**: Built with the latest App Router and React Server Components
- 🎨 **Tailwind CSS**: Modern styling with custom gradients and animations
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🎭 **Framer Motion**: Smooth animations and transitions
- 🔒 **LGPD Compliant**: Privacy-first design for Brazilian healthcare market

## Pages

- **Homepage**: Hero section with product overview and key features
- **About**: Company information and mission
- **Contact**: Contact form and company details
- **Product Suite**: Detailed product pages for each AI solution
  - Ambient AI Clinical Documentation
  - Patient Engagement Platform
  - Clinical Decision Support
  - EHR Integration

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dooor-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
dooor-website/
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── products/          # Product pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── Navigation.tsx     # Main navigation
│   └── Footer.tsx         # Footer component
├── public/               # Static assets
└── package.json          # Dependencies
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **React 18**: Latest React with Hooks and Suspense
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Modern icon set
- **TypeScript**: Type-safe JavaScript

## Customization

### Colors
The website uses a dark theme with blue and cyan accents. You can customize colors in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    // Your custom primary colors
  },
  // ... other colors
}
```

### Animations
Custom animations are defined in `globals.css` and can be modified or extended as needed.

## Deployment

The website can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Railway**

## License

Private - All rights reserved by Dooor. 