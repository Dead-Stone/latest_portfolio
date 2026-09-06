import manifest from '@/public/game/museum/signedbymms-multicell.json'
import type { ArtPiece } from '@/data/art'

export const MUSEUM_TEXTURE = 'museum-tiles'
export const MUSEUM_PATH = '/game/museum/museum-environment.png'
export const ART_MAP_TEXTURE = 'art-map-32'
export const ART_MAP_PATH = '/game/museum/art-map-32.png'
export const framedArt = manifest.artworks

export function frameFor(art: ArtPiece) {
  const filename = art.image.split('/').pop()
  const frame = framedArt.find(item => item.source.split('/').pop() === filename)
  if (frame) return {...frame, original:false}
  return {id:-1,file:art.image,unfilteredFile:art.image,width:128,height:128,negative:Boolean(art.hasNegative),original:true}
}
export function framePath(art: ArtPiece) {
  const frame = frameFor(art)
  return frame.original ? art.image : `/game/museum/${frame.negative && frame.unfilteredFile ? frame.unfilteredFile : frame.file}`
}
