import BaseRoomScene from '../BaseRoomScene'
import { ROOMS } from '../rooms'

export default class SportsScene extends BaseRoomScene {
  protected room = ROOMS.sports

  constructor() {
    super('sports')
  }

  preload() {
    this.preloadRoomArt(this.room)
  }
}
