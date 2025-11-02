# PKSA Construction & Engineering Consultancy Ltd - Website

A modern, responsive, and accessible website for PKSA Construction & Engineering Consultancy Ltd, built with Next.js 14, TypeScript, and CSS Modules.

## 🎯 Project Overview

This website embodies PKSA's identity as a "Value-Driven Partner," showcasing their commitment to strength, precision, and reliability in construction and engineering services across Africa.

## ✨ Features

- **Responsive Design**: Mobile-first approach ensuring optimal experience across all devices
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML, proper ARIA labels, and keyboard navigation
- **Performance Optimized**: Next.js 14 with automatic code splitting and image optimization
- **Brand-Accurate**: Implements the complete PKSA brand identity including colors, typography, and logo guidelines
- **Modern Stack**: Built with Next.js 14, TypeScript, and CSS Modules

## 🎨 Design System

### Colors
- **Primary**: `#01030A` - Reconstruct development
- **Secondary**: `#4A9982` - Aldea balance and versatility
- **Highlight**: `#FFFAE7` - Innovates energy and focus

### Typography
- **Headers**: Sync (Bold, 700)
- **Body**: Instrument Sans (Regular, 400)
- **Line Height**: 1.4 (140%)

### Logo Implementation
- Primary logo used in desktop header/footer
- Secondary logo (PKSΛ standalone) for mobile view
- Clear space rules implemented per brand guidelines

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🚀 Deploying to Vercel

This project is ready to deploy on [Vercel](https://vercel.com/) using the included `vercel.json` configuration. The recommended workflow is to push your code to GitHub/GitLab/Bitbucket and connect the repository to Vercel.

### 1. Commit & push

```bash
git add .
git commit -m "Prepare Vercel deployment"
git push origin main
```

### 2. Create a new Vercel project

1. Sign in to Vercel and click **New Project**.
2. Import your Git repository.
3. Vercel automatically detects the Next.js framework and uses the build command from `vercel.json` (`npm run build`).

### 3. Configure environment variables

Add the following variables in the Vercel dashboard under **Project Settings → Environment Variables** (use the same values you have locally in `.env.local`):

| Name | Description |
| ---- | ----------- |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `GMAIL_USER` | Gmail address used to send contact emails |
| `GMAIL_APP_PASSWORD` | Gmail App Password (16 characters) |

👉 **Important:** The contact message storage in `lib/contact-messages.ts` uses the local filesystem (`data/contact-messages.json`). Vercel’s serverless functions have ephemeral storage, so messages won’t persist between deployments or instances. For production, replace this with a persistent store (e.g., Supabase, PlanetScale, MongoDB, etc.).

### 4. Trigger the first deployment

Click **Deploy**. Vercel will build the project and provide a preview URL followed by the production URL (e.g., `https://your-project.vercel.app`).

### 5. Optional: Custom Domain

Map your custom domain in **Project Settings → Domains**.

### Local Preview of the Production Build

```bash
npm run build
npm run start
```

This mimics Vercel’s production environment on your machine.

## 📁 Project Structure

```
pascal/
├── app/
│   ├── about/          # About Us page
│   ├── contact/        # Contact page with form
│   ├── projects/       # Projects/Portfolio page
│   ├── services/       # Services page
│   ├── globals.css     # Global styles and design system
│   ├── layout.tsx      # Root layout with metadata
│   └── page.tsx        # Homepage
├── components/
│   ├── Header.tsx      # Global header component
│   ├── Header.module.css
│   ├── Footer.tsx      # Global footer component
│   └── Footer.module.css
├── public/             # Static assets (images, favicon, etc.)
├── next.config.js      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## 🎯 Pages

- **Homepage** (`/`): Hero section, value propositions, and services preview
- **About Us** (`/about`): Mission, vision, and core values
- **Services** (`/services`): Detailed service offerings
- **Projects** (`/projects`): Portfolio showcase with grid layout
- **Contact** (`/contact`): Contact form and information

## ♿ Accessibility Features

- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels and roles where appropriate
- Keyboard navigation support
- Focus indicators
- Screen reader friendly markup
- Proper heading hierarchy
- Form labels and error messaging
- Color contrast ratios meeting WCAG AA standards

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Fonts**: Google Fonts (Sync, Instrument Sans)
- **Deployment**: Ready for Vercel, Netlify, or any Node.js hosting

## 📝 Development Notes

### Adding New Pages
1. Create a new folder in `app/` directory
2. Add `page.tsx` and `page.module.css`
3. Include `<Header />` and `<Footer />` components
4. Update navigation in `components/Header.tsx`

### Styling Guidelines
- Use CSS custom properties (variables) from `globals.css`
- Follow mobile-first approach
- Maintain brand color palette
- Ensure accessibility with proper contrast ratios

### Logo Usage
- Desktop: Full logo (PKSΛ + Company Name)
- Mobile: Standalone PKSΛ
- Maintain clear space: Height of "P" ÷ 3.236

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📞 Contact Information

For questions about this website implementation, please contact:
- Email: info@pksa-construction.com
- Phone: +233 XX XXX XXXX

## 📄 License

© 2024 PKSA Construction & Engineering Consultancy Ltd. All rights reserved.

## 🔄 Updates & Maintenance

### To Update Content
- Edit page components in `app/` directory
- Update contact information in `components/Footer.tsx` and `app/contact/page.tsx`
- Replace placeholder images in `public/` directory

### To Add Projects
- Update projects array in `app/projects/page.tsx`
- Add project images to `public/` directory
- Consider creating individual project pages for detailed views

---

**Built with ❤️ following PKSA brand guidelines and best practices.**

