# Portfolio Website - Mohana Moganti

A modern, responsive portfolio website built with Next.js, React, TypeScript, TailwindCSS, and Framer Motion. Features dark mode support and a sleek, professional design.

## Features

- 🎨 Modern and clean UI design
- 🌙 Dark mode support with smooth transitions
- 📱 Fully responsive layout
- ✨ Smooth animations with Framer Motion
- 🚀 Built with Next.js 14 and React 18
- 💅 Styled with TailwindCSS
- 📧 Contact form
- 🔗 Social media links
- 🎯 Vertical timeline for experience section
- 🖼️ Company logos in experience timeline

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Dead-Stone/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
portfolio/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/          # React components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Experience.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   └── ThemeToggle.tsx
├── contexts/           # React contexts
│   └── ThemeContext.tsx
├── data/               # Data files
│   └── experiences.ts
└── public/             # Static assets
    ├── exp/           # Company logos
    ├── logo.png
    └── mohana-pixel.jpeg
```

## Customization

### Update Your Information

1. **Hero Section** (`components/Hero.tsx`):
   - Update your name and introduction text
   - Add your social media links (LinkedIn, GitHub)

2. **About Section** (`components/About.tsx`):
   - Update the about me text with your story
   - Update education information

3. **Projects Section** (`components/Projects.tsx`):
   - Add your projects with descriptions, technologies, and links

4. **Skills Section** (`components/Skills.tsx`):
   - Update the skills array with your technologies

5. **Experience Section** (`data/experiences.ts`):
   - Add your work experience with details and company logos

6. **Contact Section** (`components/Contact.tsx`):
   - Update the email address and phone number

### Update Resume

Place your resume PDF in the `public` folder and update the link in `components/Hero.tsx`.

### Add Company Logos

Place company logos in the `public/exp/` folder and update the logo paths in `data/experiences.ts`.

## Deployment

This project can be deployed on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages** (with static export)
- Any hosting service that supports Node.js

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

## License

This project is open source and available under the MIT License.

## Contact

Mohana Moganti
- Email: mohanmoganti2023@gmail.com
- Phone: +1 (669) 329-9412
- LinkedIn: [linkedin.com/in/mohana-moganti](https://www.linkedin.com/in/mohana-moganti/)
- GitHub: [github.com/Dead-Stone](https://github.com/Dead-Stone)
