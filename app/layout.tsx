import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { PageTransitionProvider } from '@/contexts/PageTransitionContext'
import PageTransition from '@/components/PageTransition'
import { Caveat } from 'next/font/google'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: 'Mohana Moganti - Software Engineer & AI Engineer',
  description: 'Software Engineer and AI Engineer based in San Jose, CA. Specializing in Full-Stack Development, AI/ML Systems, and Cloud Infrastructure.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={caveat.variable}>
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

