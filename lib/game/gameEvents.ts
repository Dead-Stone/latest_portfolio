import * as Phaser from 'phaser'
import type { ArtPiece } from '@/data/art'

/** Shared bridge between Phaser scenes and the React overlay UI. */
export const gameEvents = new Phaser.Events.EventEmitter()

export const GameEvent = {
  PAINTING_NEAR: 'painting-near',
  DIALOGUE_OPEN: 'dialogue-open',
  ROOM_CHANGED: 'room-changed',
  NAVIGATE: 'navigate',
  READY: 'ready',
  POSITION: 'position',
  GUIDE_OPEN: 'guide-open',
  HINT: 'interaction-hint',
  ARRIVAL: 'arrival',
  SKIP_ARRIVAL: 'skip-arrival',
  CANCEL_WALK: 'cancel-walk',
  EXIT: 'exit-museum',
} as const


export interface PaintingNearPayload {
  art: ArtPiece | null
  roomKey: string
}

export interface DialogueOpenPayload {
  art: ArtPiece
  roomKey: string
}
