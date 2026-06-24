import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { PageTransitionProvider } from '@/contexts/PageTransitionContext'
import PageTransition from '@/components/PageTransition'
import { Caveat, Shadows_Into_Light_Two, Space_Grotesk } from 'next/font/google'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
})

const shadowsIntoLightTwo = Shadows_Into_Light_Two({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-shadows',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mohanamoganti.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Mohana Moganti — Software Engineer & AI Engineer',
    template: '%s · Mohana Moganti',
  },
  description:
    'Software Engineer and AI Engineer in San Jose, CA. Building LLM-driven systems, agentic AI, RAG pipelines, and full-stack products. MS Software Engineering @ SJSU.',
  keywords: [
    'Mohana Moganti',
    'Software Engineer',
    'AI Engineer',
    'Full-Stack Developer',
    'RAG',
    'LLM',
    'San Jose',
    'Portfolio',
  ],
  authors: [{ name: 'Mohana Moganti', url: siteUrl }],
  creator: 'Mohana Moganti',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Mohana Moganti',
    title: 'Mohana Moganti — Software Engineer & AI Engineer',
    description:
      'LLM systems, agentic AI, and full-stack engineering. ScorePAL, LM Link for Android, and production RAG work.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohana Moganti — Software Engineer & AI Engineer',
    description: 'LLM systems, agentic AI, and full-stack engineering portfolio.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  icons: {
    icon: [{ url: '/icon', type: 'image/png' }],
    apple: [{ url: '/apple-icon', type: 'image/png' }],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${caveat.variable} ${spaceGrotesk.variable} ${shadowsIntoLightTwo.variable}`}
    >
      <body>
        <ThemeProvider>
          <PageTransitionProvider>
            <PageTransition />
            {children}
          </PageTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
