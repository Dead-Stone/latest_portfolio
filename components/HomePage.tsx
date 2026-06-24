'use client'

import { useState, useEffect, useMemo } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Publications from '@/components/Publications'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import PageToggle from '@/components/PageToggle'
import type { GalleryExperience } from '@/lib/office-gallery'

interface HomePageProps {
  galleryExperiences: GalleryExperience[]
}

export default function HomePage({ galleryExperiences }: HomePageProps) {
  const [activeSection, setActiveSection] = useState('home')
  const showGallery = galleryExperiences.length > 0

  const sections = useMemo(() => {
    const ids = ['home', 'about', 'projects', 'skills', 'experience', 'publications']
    if (showGallery) ids.push('gallery')
    ids.push('contact')
    return ids
  }, [showGallery])

  useEffect(() => {
    if (window.innerWidth < 768) {
      window.scrollTo(0, 0)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  return (
    <main className="min-h-screen">
      <Navigation activeSection={activeSection} showGallery={showGallery} />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Publications />
      {showGallery && <Gallery experiences={galleryExperiences} />}
      <Contact />
      <PageToggle />
    </main>
  )
}
