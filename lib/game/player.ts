import * as Phaser from 'phaser'
import type { Direction } from './rooms'
export const CHARACTER_SPRITE_PATH = '/game/character.png'
export const CHARACTER_KEY = 'mohana'
export const CHARACTER_SEATED_KEY = 'mohana-seated'
export const CHARACTER_FRAME_WIDTH = 32
export const CHARACTER_FRAME_HEIGHT = 32
export const CHARACTER_FRAMES_PER_ROW = 4
export const CHARACTER_ROW_ORDER: Direction[] = ['down', 'left', 'right', 'up']
export function createWalkAnimations(scene: Phaser.Scene) {
  CHARACTER_ROW_ORDER.forEach((direction, row) => {
    const key = `walk-${direction}`
    if (!scene.anims.exists(key)) scene.anims.create({
      key, frames: scene.anims.generateFrameNumbers(CHARACTER_KEY, { start: row * 4, end: row * 4 + 3 }),
      frameRate: 8, repeat: -1,
    })
  })
}
export function idleFrame(direction: Direction) {
  return CHARACTER_ROW_ORDER.indexOf(direction) * CHARACTER_FRAMES_PER_ROW
}

/** A dedicated native-pixel seated pose: unchanged likeness, bent knees, hands on thighs. */
export function createSeatedPose(scene: Phaser.Scene) {
  if (scene.textures.exists(CHARACTER_SEATED_KEY)) return
  const texture = scene.textures.createCanvas(CHARACTER_SEATED_KEY,32,32)!
  const ctx = texture.context
  ctx.imageSmoothingEnabled = false
  const source = scene.textures.get(CHARACTER_KEY).getSourceImage() as HTMLImageElement
  // Reuse the exact head and shoulders; draw a new seated lower body, never crop off legs.
  ctx.drawImage(source,0,0,32,18,0,0,32,18)
  const palette: Record<string,string> = {
    o:'#0e0f12', n:'#1d2b48', j:'#2a2e39', d:'#181b24',
    b:'#461b27', r:'#712b3c', t:'#3d4250', s:'#cf7e43',
    h:'#e19f57', a:'#a95b31', v:'#8b5cf6', g:'#535b6f',
  }
  // 16 columns at x=8. Thighs widen forward, shins turn down, shoes project out.
  const rows = [
    'onnnobbbbonnnno.',
    'ojnnobbrbonndno.',
    '.onnohbbahnnno..',
    '..onhhsashnno...',
    '..otttodttto....',
    '.ottttodtttto...',
    '.otjtto.ottjto..',
    '..oddto.otddo...',
    '..oddto.otddo...',
    '.ogvgo...ogvgo..',
    '.ooooo...ooooo..',
  ]
  rows.forEach((row,y)=>row.split('').forEach((colour,x)=>{
    if (palette[colour]) { ctx.fillStyle=palette[colour];ctx.fillRect(x+8,y+18,1,1) }
  }))
  texture.refresh()
}
