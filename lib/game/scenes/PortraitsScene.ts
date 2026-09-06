import BaseRoomScene from '../BaseRoomScene'
import { ROOMS } from '../rooms'

export default class PortraitsScene extends BaseRoomScene {
  protected room = ROOMS.portraits

  constructor() {
    super('portraits')
  }

  preload() {
    this.preloadRoomArt(this.room)
  }
}
