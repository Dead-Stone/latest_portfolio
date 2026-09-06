/**
 * Mutable input state fed by the on-screen mobile d-pad/interact button.
 * Mutated directly (never via setState) so touch presses don't trigger
 * React re-renders — the Phaser scene reads this each frame in update().
 */
export interface TouchInputState {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  interact: boolean
  locked: boolean
}

export const touchInput: TouchInputState = {
  up: false,
  down: false,
  left: false,
  right: false,
  interact: false,
  locked: false,
}

export function resetTouchInput() {
  touchInput.up = touchInput.down = touchInput.left = touchInput.right = touchInput.interact = false
}
