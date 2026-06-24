import HomePage from '@/components/HomePage'
import { getGalleryExperiences } from '@/lib/office-gallery'

export default function Home() {
  const galleryExperiences = getGalleryExperiences()
  return <HomePage galleryExperiences={galleryExperiences} />
}
