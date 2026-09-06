import BaseRoomScene from '../BaseRoomScene'
import { ROOMS } from '../rooms'

export default class ScreenFilmScene extends BaseRoomScene {
  protected room = ROOMS.screenfilm

  constructor() {
    super('screenfilm')
  }

  preload() {
    this.preloadRoomArt(this.room)
  }
}
