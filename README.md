# Portfolio Website

A modern, responsive portfolio website built with Next.js, React, TypeScript, TailwindCSS, and Framer Motion.

## Features

- 🎨 Modern and clean UI design
- 📱 Fully responsive layout
- ✨ Smooth animations with Framer Motion
- 🚀 Built with Next.js 14 and React 18
- 💅 Styled with TailwindCSS
- 📧 Contact form
- 🔗 Social media links

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Update Your Information

1. **Hero Section** (`components/Hero.tsx`):
   - Update your name and introduction text
   - Add your social media links (LinkedIn, GitHub)

2. **About Section** (`components/About.tsx`):
   - Update the about me text with your story

3. **Projects Section** (`components/Projects.tsx`):
   - Add your projects with descriptions, technologies, and links

4. **Skills Section** (`components/Skills.tsx`):
   - Update the skills array with your technologies

5. **Experience Section** (`components/Experience.tsx`):
   - Add your work experience with details

6. **Contact Section** (`components/Contact.tsx`):
   - Update the email address
   - Configure form submission (you may want to use a service like Formspree or EmailJS)

### Update Resume

Place your resume PDF in the `public` folder and update the link in `components/Hero.tsx`.

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library

## License

This project is open source and available under the MIT License.

