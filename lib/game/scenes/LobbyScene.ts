import BaseRoomScene from '../BaseRoomScene'
import { ROOMS } from '../rooms'

export default class LobbyScene extends BaseRoomScene {
  protected room = ROOMS.lobby

  constructor() {
    super('lobby')
  }

  preload() {
    this.preloadRoomArt(this.room)
  }
}
