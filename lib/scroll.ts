const NAV_OFFSET = 72

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (!element) return

  const top = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight

  window.scrollTo({
    top: Math.min(Math.max(0, top), maxScroll),
    behavior: 'smooth',
  })

  if (window.location.hash !== `#${sectionId}`) {
    history.replaceState(null, '', `#${sectionId}`)
  }
}
