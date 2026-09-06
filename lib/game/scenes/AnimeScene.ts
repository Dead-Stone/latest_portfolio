import BaseRoomScene from '../BaseRoomScene'
import { ROOMS } from '../rooms'

export default class AnimeScene extends BaseRoomScene {
  protected room = ROOMS.anime

  constructor() {
    super('anime')
  }

  preload() {
    this.preloadRoomArt(this.room)
  }
}
