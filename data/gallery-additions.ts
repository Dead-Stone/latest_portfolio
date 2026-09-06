import type { ArtPiece } from './art'

export interface GalleryAddition {
  room: 'lobby' | 'portraits' | 'anime' | 'screenfilm' | 'sports'
  /** Centre of an unused hanging position, in native map pixels. */
  x: number
  y: number
  art: ArtPiece
}

/** Add local images to public/art, then add their metadata here. See GALLERY.md. */
export const galleryAdditions: GalleryAddition[] = []
