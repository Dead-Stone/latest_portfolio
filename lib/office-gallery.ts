import fs from 'fs'
import path from 'path'
import { experiences, type Experience } from '@/data/experiences'

const OFFICE_DIR = path.join(process.cwd(), 'public', 'exp', 'office')
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i

export type GalleryExperience = Experience & { officePhoto: string }

function officeImageMap(): Map<string, string> {
  if (!fs.existsSync(OFFICE_DIR)) return new Map()

  const map = new Map<string, string>()
  for (const file of fs.readdirSync(OFFICE_DIR)) {
    if (!IMAGE_EXT.test(file)) continue
    const stem = file.replace(/\.[^.]+$/, '')
    map.set(stem, `/exp/office/${file}`)
  }
  return map
}

export function getGalleryExperiences(): GalleryExperience[] {
  const images = officeImageMap()

  return experiences.flatMap(exp => {
    if (!exp.officePhotoKey) return []
    const officePhoto = images.get(exp.officePhotoKey)
    if (!officePhoto) return []
    return [{ ...exp, officePhoto }]
  })
}

export function hasGallerySection(): boolean {
  return getGalleryExperiences().length > 0
}
