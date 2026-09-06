import * as Phaser from 'phaser'
import { insideRoom, ROOMS, type RoomDef, type PaintingSlot, type Direction } from './rooms'
import { gameEvents, GameEvent } from './gameEvents'
import { touchInput, resetTouchInput } from './touchInput'
import { CHARACTER_KEY, CHARACTER_SEATED_KEY, CHARACTER_SPRITE_PATH, createSeatedPose, createWalkAnimations, idleFrame } from './player'
import { frameFor, ART_MAP_PATH, ART_MAP_TEXTURE, MUSEUM_PATH, MUSEUM_TEXTURE } from './assets'
import { walkingPath } from './navigation'
import type { Point, PlanRect } from './rooms'
import { galleryFurnishings, furnishingBounds, drawFurnishing } from './galleryFurnishings'

interface RoomStartData { spawnAt?: { x: number; y: number }; facing?: Direction }
const PLAYER_SPEED = 90
// Keep the character readable on every device; the floor plan provides the overview.
const EXPLORATION_ZOOM = 3

export default abstract class BaseRoomScene extends Phaser.Scene {
  protected abstract room: RoomDef
  private player!: Phaser.Physics.Arcade.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private wasd!: Record<'up' | 'down' | 'left' | 'right', Phaser.Input.Keyboard.Key>
  private nearArtId: number | null = null
  private transitioning = false
  private facing: Direction = 'up'
  private highlights = new Map<number, Phaser.GameObjects.Rectangle>()
  private obstacles!: Phaser.Physics.Arcade.StaticGroup
  private lastPositionSent = 0
  private collisionRects: PlanRect[] = []
  private path: Point[] = []
  private arrivalAction: (() => void) | null = null
  private destination?: Phaser.GameObjects.Arc
  private restingAt: Point | null = null
  private entering = false
  private reducedMotion = false
  private hint = ''
  private walkDistance = 0
  private lastWalkPosition: Point | null = null
  private playerReady = false
  private entryTimer?: Phaser.Time.TimerEvent
  private finishTransition?: () => void

  private hasLivePlayer() {
    return this.playerReady && this.sys.isActive() && Boolean(this.player?.body)
  }

  private showHint(message: string) {
    if (this.hint === message) return
    this.hint = message
    gameEvents.emit(GameEvent.HINT, message)
  }

  protected preloadRoomArt(room: RoomDef) {
    if (!this.textures.exists(CHARACTER_KEY)) this.load.spritesheet(CHARACTER_KEY, CHARACTER_SPRITE_PATH, { frameWidth: 32, frameHeight: 32 })
    if (!this.textures.exists(MUSEUM_TEXTURE)) this.load.spritesheet(MUSEUM_TEXTURE, MUSEUM_PATH, { frameWidth: 32, frameHeight: 32 })
    if (!this.textures.exists(ART_MAP_TEXTURE)) this.load.spritesheet(ART_MAP_TEXTURE, ART_MAP_PATH, { frameWidth: 32, frameHeight: 32 })
    room.paintings.filter(slot => { const frame = frameFor(slot.art); return frame.original || frame.negative }).forEach(({art}) => {
      if (!this.textures.exists(`original-${art.id}`)) this.load.image(`original-${art.id}`, art.image)
    })
  }

  create(data: RoomStartData = {}) {
    this.playerReady = false
    const room = this.room
    this.nearArtId = null
    this.transitioning = false
    this.highlights.clear()
    this.collisionRects = []
    this.path = []
    this.arrivalAction = null
    this.restingAt = null
    this.entering = false
    this.hint = ''
    this.walkDistance = 0
    this.lastWalkPosition = null
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    resetTouchInput()
    this.cameras.main.setBackgroundColor(0x302b34).setRoundPixels(true)
    this.physics.world.setBounds(8, 0, room.width - 16, room.height)
    // Camera may look beyond a room edge so Mohana never drifts under the UI.
    // Physics bounds and the room walls still constrain actual movement.
    this.cameras.main.removeBounds()
    this.obstacles = this.physics.add.staticGroup()
    this.buildMuseum()
    room.paintings.forEach(slot => this.renderPainting(slot))
    createWalkAnimations(this)
    createSeatedPose(this)
    const firstArrival = room.key === 'lobby' && !this.registry.get('museum-entered')
    const spawn = firstArrival ? {x:320,y:480} : data.spawnAt ?? room.playerSpawn
    this.registry.set('museum-entered', true)
    this.facing = data.facing ?? room.playerSpawn.facing
    this.player = this.physics.add.sprite(spawn.x, spawn.y, CHARACTER_KEY, idleFrame(this.facing)).setOrigin(0.5, 1)
    this.player.setSize(12, 8).setOffset(10, 22).setCollideWorldBounds(true)
    this.playerReady = true
    this.physics.add.collider(this.player, this.obstacles)
    const resizeCamera = () => {
      if (!this.playerReady || !this.player?.body) return
      this.cameras.main.setZoom(EXPLORATION_ZOOM).setFollowOffset(0, 14)
      this.cameras.main.centerOn(this.player.x,this.player.y-14)
    }
    this.cameras.main.startFollow(this.player, true, 1, 1)
    resizeCamera()
    this.scale.on(Phaser.Scale.Events.RESIZE, resizeCamera)
    if (!this.reducedMotion) this.cameras.main.fadeIn(400, 24, 23, 34)
    const kb = this.input.keyboard!
    this.cursors = kb.createCursorKeys()
    this.wasd = { up: kb.addKey('W'), down: kb.addKey('S'), left: kb.addKey('A'), right: kb.addKey('D') }
    const interact = kb.addKey('E')
    const open = () => this.tryOpenDialogue()
    interact.on('down', open)
    const navigate = (key: string) => {
      if (!ROOMS[key] || key === this.room.key) return
      this.changeRoom(key)
    }
    gameEvents.on(GameEvent.NAVIGATE, navigate)
    const cancelWalk = () => this.cancelWalk()
    gameEvents.on(GameEvent.CANCEL_WALK, cancelWalk)
    const blur = () => { resetTouchInput(); kb.resetKeys() }
    this.game.events.on(Phaser.Core.Events.BLUR, blur)
    const skipArrival = () => {
      if (!this.hasLivePlayer() || !this.entering) return
      this.entryTimer?.remove(false)
      this.path = []; this.arrivalAction = null; this.entering = false
      this.player.setPosition(320,440).setVelocity(0)
      gameEvents.emit(GameEvent.ARRIVAL, false)
      this.showHint('Click the floor to walk. Approach a painting and press E.')
    }
    gameEvents.on(GameEvent.SKIP_ARRIVAL, skipArrival)
    const pointerDown = (pointer: Phaser.Input.Pointer, objects: Phaser.GameObjects.GameObject[]) => {
      if (!this.hasLivePlayer() || objects.length || touchInput.locked || this.entering || this.transitioning) return
      const point = this.cameras.main.getWorldPoint(pointer.x, pointer.y)
      this.walkTo(point)
    }
    this.input.on('pointerdown',pointerDown)
    // Game.destroy emits DESTROY without necessarily emitting SHUTDOWN. Both paths
    // must release the shared React/Phaser bridge, including development hot reload.
    const sceneEvents=this.events, input=this.input, camera=this.cameras.main, game=this.game
    let disposed=false
    const dispose=()=>{
      if(disposed) return
      disposed=true
      this.playerReady=false
      this.transitioning=true
      this.entering=false
      this.entryTimer?.remove(false)
      this.entryTimer=undefined
      if(this.finishTransition) camera.off(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,this.finishTransition)
      this.finishTransition=undefined
      this.cancelWalk()
      this.restingAt=null
      interact.off('down',open)
      input.off('pointerdown',pointerDown)
      this.scale.off(Phaser.Scale.Events.RESIZE,resizeCamera)
      gameEvents.off(GameEvent.NAVIGATE,navigate)
      gameEvents.off(GameEvent.CANCEL_WALK,cancelWalk)
      gameEvents.off(GameEvent.SKIP_ARRIVAL,skipArrival)
      game.events.off(Phaser.Core.Events.BLUR,blur)
      sceneEvents.off(Phaser.Scenes.Events.SHUTDOWN,dispose)
      sceneEvents.off(Phaser.Scenes.Events.DESTROY,dispose)
      resetTouchInput()
      gameEvents.emit(GameEvent.PAINTING_NEAR,{art:null,roomKey:room.key})
      gameEvents.emit(GameEvent.HINT,'')
      gameEvents.emit(GameEvent.ARRIVAL,false)
    }
    sceneEvents.once(Phaser.Scenes.Events.SHUTDOWN,dispose)
    sceneEvents.once(Phaser.Scenes.Events.DESTROY,dispose)
    gameEvents.emit(GameEvent.ROOM_CHANGED, room.key)
    gameEvents.emit(GameEvent.READY)
    gameEvents.emit(GameEvent.POSITION, {roomKey:room.key,x:this.player.x,y:this.player.y})
    if (!this.playerReady) return
    if (firstArrival && !this.reducedMotion) {
      this.entering = true
      gameEvents.emit(GameEvent.ARRIVAL, true)
      this.entryTimer=this.time.delayedCall(600, () => {
        if (!this.hasLivePlayer() || !this.entering) return
        this.walkTo({x:320,y:440}, () => {
          this.entering = false
          gameEvents.emit(GameEvent.ARRIVAL, false)
          this.showHint('Welcome. Click a painting to walk over and take a closer look.')
        })
      })
    } else if (firstArrival) this.player.setPosition(320,440)
  }

  update(_time: number, delta: number) {
    if (!this.hasLivePlayer()) return
    const travelled = this.lastWalkPosition ? Math.hypot(this.player.x-this.lastWalkPosition.x,this.player.y-this.lastWalkPosition.y) : 0
    this.lastWalkPosition = {x:this.player.x,y:this.player.y}
    if (touchInput.locked || this.transitioning) {
      this.player.setVelocity(0, 0).anims.stop()
      if (!this.restingAt) this.player.setFrame(idleFrame(this.facing))
      return
    }
    let vx = Number(this.cursors.right.isDown || this.wasd.right.isDown || touchInput.right) - Number(this.cursors.left.isDown || this.wasd.left.isDown || touchInput.left)
    let vy = Number(this.cursors.down.isDown || this.wasd.down.isDown || touchInput.down) - Number(this.cursors.up.isDown || this.wasd.up.isDown || touchInput.up)
    if (this.entering) { vx = 0; vy = 0 }
    if (vx || vy) { this.cancelWalk(); this.standUp() }
    while (!vx && !vy && this.path.length) {
      const next = this.path[0], dx = next.x - this.player.x, dy = next.y - this.player.y
      const distance = Math.hypot(dx,dy)
      const speed = this.entering ? 55 : PLAYER_SPEED
      if (distance <= Math.max(1, speed * Math.min(delta, 50) / 1000)) {
        this.player.setPosition(next.x,next.y)
        this.path.shift()
        if (!this.path.length) {
          const action = this.arrivalAction
          this.cancelWalk()
          action?.()
          if (!this.hasLivePlayer() || touchInput.locked || this.transitioning) return
        }
      } else { vx = dx / distance; vy = dy / distance }
    }
    if (this.restingAt) {
      if (touchInput.interact) { touchInput.interact = false; this.standUp() }
      return
    }
    if (vx || vy) {
      this.facing = Math.abs(vx) > Math.abs(vy) ? (vx > 0 ? 'right' : 'left') : (vy > 0 ? 'down' : 'up')
      const length = Math.hypot(vx, vy)
      vx = vx / length * (this.entering ? 55 : PLAYER_SPEED)
      vy = vy / length * (this.entering ? 55 : PLAYER_SPEED)
      // Match the footfalls to actual distance; keep the gait continuous around route corners.
      this.walkDistance += Math.min(travelled,10)
      this.player.anims.stop()
      const phase = [1,2,3,0][Math.floor(this.walkDistance / 10) % 4]
      this.player.setFrame(idleFrame(this.facing)+phase)
    } else {
      this.walkDistance = 0
      this.player.anims.stop()
      this.player.setFrame(idleFrame(this.facing))
    }
    this.player.setVelocity(vx, vy).setDepth(this.player.y + 10)
    this.updateNearPainting()
    if (this.time.now - this.lastPositionSent > 150) {
      this.lastPositionSent = this.time.now
      gameEvents.emit(GameEvent.POSITION, {roomKey:this.room.key,x:this.player.x,y:this.player.y})
    }
    this.checkDoors()
    if (!this.hasLivePlayer() || this.transitioning) return
    if (touchInput.interact) { touchInput.interact = false; this.tryOpenDialogue() }
    if (!this.path.length && !this.entering && this.nearArtId == null) {
      const prop = this.nearProp()
      this.showHint(prop ? (prop.tile === 40 ? 'E · Sit on the bench' : 'E · Read the museum guide') : '')
    }
  }

  private cancelWalk() {
    this.path = []; this.arrivalAction = null
    this.destination?.destroy(); this.destination = undefined
  }

  private walkTo(target: Point, action?: () => void) {
    if (!this.hasLivePlayer() || this.transitioning) return
    this.standUp()
    this.cancelWalk()
    const path = walkingPath(this.player, target, this.room.width, this.room.height, this.collisionRects)
    if (!path) { this.showHint('That spot is blocked. Choose an open area of floor.'); return }
    this.path = path; this.arrivalAction = action ?? null
    this.destination = this.add.circle(target.x,target.y-3,5).setStrokeStyle(1,0xb38d54).setDepth(3)
    this.showHint(action ? 'Walking over… Move with the arrow keys to cancel.' : 'Walking… Arrow keys take over at any time.')
    if (!path.length) { this.cancelWalk(); action?.() }
  }

  private nearProp() {
    if (!this.hasLivePlayer()) return undefined
    return this.room.props.find(p => [40,41,42,47].includes(p.tile) && Math.abs(this.player.x-p.x)<24 && this.player.y>=p.y+4 && this.player.y<p.y+38)
  }

  private useProp(prop: RoomDef['props'][number]) {
    if (!this.hasLivePlayer() || this.transitioning) return
    if (prop.tile !== 40) {
      touchInput.locked = true
      gameEvents.emit(GameEvent.GUIDE_OPEN)
      return
    }
    this.restingAt = {x:this.player.x,y:this.player.y}
    this.nearArtId = null
    this.highlights.forEach(highlight => highlight.setVisible(false))
    gameEvents.emit(GameEvent.PAINTING_NEAR, {art:null,roomKey:this.room.key})
    this.player.setVelocity(0).anims.stop()
    this.facing = 'down'
    this.player.setTexture(CHARACTER_SEATED_KEY).setPosition(prop.x,prop.y+2).setDepth(prop.y+10)
    ;(this.player.body as Phaser.Physics.Arcade.Body).enable = false
    this.showHint('Take a moment. Move or press E to stand up.')
  }

  private standUp() {
    if (!this.hasLivePlayer() || !this.restingAt) return
    this.player.setTexture(CHARACTER_KEY,idleFrame('down')).setPosition(this.restingAt.x,this.restingAt.y)
    this.player.setSize(12,8).setOffset(10,22)
    ;(this.player.body as Phaser.Physics.Arcade.Body).enable = true
    this.restingAt = null
    this.showHint('')
  }

  private changeRoom(key: string, data: RoomStartData = {}) {
    if (!this.hasLivePlayer() || this.transitioning || this.entering) return
    this.transitioning = true
    this.cancelWalk(); resetTouchInput()
    this.player.setVelocity(0)
    const finish = () => {
      this.finishTransition=undefined
      if (!this.hasLivePlayer()) return
      if (key === '__exit') gameEvents.emit(GameEvent.EXIT)
      else this.scene.start(key,data)
    }
    if (this.reducedMotion) { finish(); return }
    this.finishTransition=finish
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, finish)
    this.cameras.main.fadeOut(180,24,23,34)
  }

  private tile(id: number, x: number, y: number, depth = 0) {
    return this.add.image(x, y, MUSEUM_TEXTURE, id).setOrigin(0).setDepth(depth)
  }
  private solid(x: number, y: number, w: number, h: number) {
    if (w <= 0 || h <= 0) return
    this.collisionRects.push({x,y,w,h})
    const zone = this.add.zone(x + w / 2, y + h / 2, w, h)
    this.physics.add.existing(zone, true)
    this.obstacles.add(zone)
  }
  private prop(id: number, x: number, y: number) {
    this.add.rectangle(x + 2, y - 3, 26, 7, 0x302b34, 0.13).setDepth(y - 1)
    const image = this.add.image(x, y, MUSEUM_TEXTURE, id).setOrigin(0.5, 1).setDepth(y)
    if ([40,41,42,47].includes(id)) {
      image.setInteractive({useHandCursor:true}).on('pointerdown', () => {
        if (touchInput.locked || this.entering || this.transitioning) return
        this.walkTo({x,y:y+20}, () => this.useProp({tile:id,x,y}))
      })
    }
    this.solid(x - 10, y - 8, 20, 6)
  }
  private buildMuseum() {
    const { width, height, doors, key, walls, props, guideRoute } = this.room
    const themes: Record<string, { floor: number; accent: number; wall: number }> = {
      lobby: { floor: 2, accent: 0x853748, wall: 0xe9dfcb },
      portraits: { floor: 6, accent: 0xb38d54, wall: 0x514854 },
      anime: { floor: 0, accent: 0x633c78, wall: 0xe9dfcb },
      screenfilm: { floor: 6, accent: 0x853748, wall: 0xc2b7a7 },
      sports: { floor: 4, accent: 0x537346, wall: 0xe9dfcb },
    }
    const theme = themes[key]
    const inside = (x: number, y: number) => insideRoom(this.room, x, y)
    const atDoor = (side: string, x: number, y: number) => doors.some(d =>
      d.side === side && x >= d.x && x <= d.x + d.w && y >= d.y && y <= d.y + d.h)
    for (let y = 0; y < height; y += 32) for (let x = 0; x < width; x += 32) {
      if (!inside(x + 16, y + 16)) {
        this.solid(x, y, 32, 32)
        continue
      }
      this.tile(theme.floor + (((x / 32 + y / 32 * 3) % 7 === 0 && theme.floor !== 4) ? 1 : 0), x, y)
      if (!inside(x + 16, y - 16) && !atDoor('N', x + 16, y)) {
        this.tile(49, x, y, 2); this.solid(x, y, 32, 8)
      }
      if (!inside(x + 16, y + 48) && !atDoor('S', x + 16, y + 32)) {
        this.tile(13, x, y, 2); this.solid(x, y + 24, 32, 8)
      }
      if (!inside(x - 16, y + 16) && !atDoor('W', x, y + 16)) {
        this.tile(11, x, y, 2); this.solid(x, y, 8, 32)
      }
      if (!inside(x + 48, y + 16) && !atDoor('E', x + 32, y + 16)) {
        this.tile(12, x, y, 2); this.solid(x + 24, y, 8, 32)
      }
    }
    // One thin trail with sparse direction cues, instead of overlapping floor ribbons.
    const trailArt=this.add.graphics().setDepth(0.6)
    trailArt.lineStyle(2,0xb38d54,0.55)
    trailArt.beginPath()
    trailArt.moveTo(guideRoute[0].x,guideRoute[0].y)
    for(const point of guideRoute.slice(1))trailArt.lineTo(point.x,point.y)
    trailArt.strokePath()
    for (let i = 1; i < guideRoute.length; i++) {
      const a = guideRoute[i - 1], b = guideRoute[i]
      if(Math.abs(b.x-a.x)+Math.abs(b.y-a.y)<56)continue
      const x=(a.x+b.x)/2,y=(a.y+b.y)/2,dx=Math.sign(b.x-a.x),dy=Math.sign(b.y-a.y)
      trailArt.lineStyle(2,0x846240,0.8)
      trailArt.beginPath()
      trailArt.moveTo(x-dx*4-dy*3,y-dy*4+dx*3)
      trailArt.lineTo(x+dx*2,y+dy*2)
      trailArt.lineTo(x-dx*4+dy*3,y-dy*4-dx*3)
      trailArt.strokePath()
    }
    for(const slot of this.room.paintings)this.add.circle(slot.x,slot.viewY,2,0xe7bb6a,0.75).setDepth(0.7)
    for (const panel of walls) {
      const {x,y,w,h}=panel
      this.add.rectangle(x+5,y+h,w,10,0x181722,0.12).setOrigin(0).setDepth(1)
      this.add.rectangle(x+w,y+5,5,h-5,0x968068).setOrigin(0).setDepth(1)
      this.add.rectangle(x,y,w,h,theme.wall).setOrigin(0).setDepth(1)
      // Crown, recessed picture rail and skirting give each hanging wall thickness.
      this.add.rectangle(x,y,w,5,0xfff3dc).setOrigin(0).setDepth(2)
      this.add.rectangle(x+4,y+9,w-8,1,0xbaa58b).setOrigin(0).setDepth(2)
      this.add.rectangle(x,y+h-8,w,4,0xbaa58b).setOrigin(0).setDepth(2)
      this.add.rectangle(x,y+h-4,w,4,0x705741).setOrigin(0).setDepth(2)
      this.add.rectangle(x,y,3,h,0xb38d54).setOrigin(0).setDepth(2)
      this.add.rectangle(x+w-3,y,3,h,0x968068).setOrigin(0).setDepth(2)
      this.solid(x,y,w,h)
    }
    const rug = key==='lobby' ? {x:272,y:320,w:3,h:3} : key==='portraits' ? {x:320,y:128,w:3,h:3} : key==='screenfilm' ? {x:352,y:256,w:3,h:3} : null
    if(rug) for(let row=0;row<rug.h;row++)for(let col=0;col<rug.w;col++){
      const id=16+(row===0?0:row===rug.h-1?2:1)*3+(col===0?0:col===rug.w-1?2:1)
      this.tile(id,rug.x+col*32,rug.y+row*32,0.8)
    }
    this.buildSectionDetails()
    props.forEach(p=>this.prop(p.tile,p.x,p.y))
    for(const furnishing of galleryFurnishings[key]??[]){
      drawFurnishing(this,furnishing)
      const b=furnishingBounds(furnishing)
      this.solid(b.x,b.y,b.w,b.h)
    }
    for (const rope of this.room.ropes ?? []) {
      const {x,y,w,h}=rope
      // Feet stop at the barrier; the viewing spot remains on the public side.
      this.solid(x,y,w,h)
      const ropeArt=this.add.graphics().setDepth(y+4)
      ropeArt.lineStyle(3,0x853748,1)
      const spans=Math.ceil(w/64)
      for(let i=0;i<spans;i++){
        const left=x+i*w/spans,right=x+(i+1)*w/spans
        ropeArt.strokePoints([{x:left,y:y-14},{x:(left+right)/2,y:y-9},{x:right,y:y-14}],false)
      }
      for(let i=0;i<=spans;i++) {
        const px=Math.round(x+i*w/spans)
        ropeArt.fillStyle(0x705741).fillRect(px-5,y,10,3)
        ropeArt.fillStyle(0xb38d54).fillRect(px-2,y-16,4,17)
        ropeArt.fillStyle(0xe7bb6a).fillRect(px-3,y-19,6,4)
      }
    }
    doors.forEach(door=>{
      const cx=door.x+door.w/2,cy=door.y+door.h/2
      const vertical=door.side==='E'||door.side==='W'
      this.add.rectangle(cx,cy,door.w,door.h,0xb38d54,0.35).setDepth(1)
      for (const sign of [-1,1]) {
        this.add.rectangle(cx+(vertical?0:sign*(door.w/2-3)),cy+(vertical?sign*(door.h/2-3):0),vertical?door.w:5,vertical?5:door.h,0x705741).setDepth(3)
      }
      this.add.rectangle(cx,cy,vertical?2:door.w-10,vertical?door.h-10:2,0xfff3dc).setDepth(2)
      const x=cx+(door.side==='W'?28:door.side==='E'?-28:0)
      const y=cy+(door.side==='N'?16:door.side==='S'?-16:0)
      const arrow=door.side==='N'?'↑':door.side==='S'?'↓':door.side==='W'?'←':'→'
      const title=door.label ?? (door.to==='lobby'?'EXPRESSIONS':door.to==='screenfilm'?'SCREEN & FILM':door.to==='sports'?'COURTSIDE':door.to==='portraits'?'PREMIUM':door.to.toUpperCase())
      this.add.text(x,y,vertical?arrow:title+' '+arrow,{fontFamily:'monospace',fontSize:'7px',color:'#705741',backgroundColor:'#fff3dc',padding:{x:3,y:3}}).setOrigin(0.5).setDepth(3)
    })
  }

  private buildSectionDetails() {
    const label=(x:number,y:number,text:string,color='#705741')=>this.add.text(x,y,text,{fontFamily:'monospace',fontSize:'7px',color,align:'center',backgroundColor:this.room.key==='portraits'?'#302b34':'#fff3dc',padding:{x:3,y:2}}).setOrigin(0.5).setDepth(4)
    switch(this.room.key) {
      case 'lobby':
        label(320,208,'NINE FACES\nJIM CARREY')
        break
      case 'portraits':
        label(352,64,'PREMIUM\nNEGATIVE ART','#e7bb6a')
        label(272,368,'LIGHT\nIN REVERSE','#e7bb6a')
        break
      case 'anime':
        label(184,112,'CHARACTERS & WANTED POSTERS')
        label(304,364,'NARUTO · STORIES IN PANELS')
        // Perforated manga-panel edging, kept out of walkable collisions.
        for(let x=136;x<480;x+=16) this.add.rectangle(x,350,6,2,0x633c78).setDepth(3)
        break
      case 'screenfilm':
        label(176,144,'COMEDY & CHARACTER')
        label(144,364,'PORTRAITS BEYOND THE SCREEN')
        for(let x=104;x<256;x+=16) this.add.rectangle(x,66,6,3,0x302b34).setDepth(3)
        for(let x=360;x<512;x+=16) this.add.rectangle(x,162,6,3,0x302b34).setDepth(3)
        break
      case 'sports': {
        const court=this.add.graphics().setDepth(0.9)
        court.fillStyle(0x537346,0.13).fillRect(272,128,272,160)
        court.lineStyle(1,0xfff3dc,0.9)
        court.strokeRect(272,128,272,160).lineBetween(408,128,408,288)
        // Angular outlines stay faithful to the native-pixel museum style.
        court.strokePoints([{x:392,y:188},{x:424,y:188},{x:432,y:200},{x:432,y:216},{x:424,y:228},{x:392,y:228},{x:384,y:216},{x:384,y:200}],true)
        court.strokeRect(272,176,48,64).strokeRect(496,176,48,64)
        court.lineBetween(282,194,282,222).lineBetween(534,194,534,222)
        label(176,112,'PLAYER PORTRAITS · GIANNIS')
        label(144,304,'SNEAKER CULTURE')
        label(576,228,'TROPHY CASE')
        // Honest expansion bays: no duplicated or invented player artwork.
        for(const x of [432,496]) {
          if(this.room.paintings.some(slot=>slot.x===x && slot.y===64)) continue
          this.add.rectangle(x,64,32,32,0xd8ccb7).setStrokeStyle(1,0xb38d54).setDepth(4)
          label(x,64,'+', '#846240')
        }
        label(464,112,'PLAYER WALL · MORE TO COME')
        break
      }
    }
  }

  private renderPainting(slot: PaintingSlot) {
    const frame = frameFor(slot.art)
    const x = Math.round(slot.x)
    const light = this.add.graphics().setDepth(2)
    light.fillStyle(0xfff3dc,0.20)
    light.fillPoints([{x:x-5,y:slot.y-20},{x:x+5,y:slot.y-20},{x:x+25,y:slot.y+28},{x:x-25,y:slot.y+28}],true)
    const glow = this.add.rectangle(x, slot.y, 36, 36).setStrokeStyle(1, 0x8960a3).setDepth(3).setVisible(false)
    this.highlights.set(slot.art.id, glow)
    let texture = ART_MAP_TEXTURE
    // The atlas contains baked-in negative filters. Use the actual source for those works.
    const sourceThumbnail = frame.original || frame.negative
    if (sourceThumbnail) {
      texture = `thumbnail-original-${slot.art.id}`
      if (!this.textures.exists(texture)) {
        const canvas = this.textures.createCanvas(texture,32,32)!
        const context = canvas.context
        context.fillStyle = '#705741'; context.fillRect(1,1,30,30)
        context.fillStyle = '#fff3dc'; context.fillRect(3,3,26,26)
        if (this.textures.exists(`original-${slot.art.id}`)) {
          const source = this.textures.get(`original-${slot.art.id}`).getSourceImage() as HTMLImageElement
          const scale = Math.min(22/source.width,22/source.height)
          const w = Math.max(1,Math.round(source.width*scale)), h = Math.max(1,Math.round(source.height*scale))
          const left = Math.floor((32-w)/2), top = Math.floor((32-h)/2)
          context.imageSmoothingEnabled = false
          context.drawImage(source,left,top,w,h)
        }
        canvas.refresh()
      }
    }
    const image = this.add.image(x, slot.y, texture, sourceThumbnail ? undefined : frame.id).setDepth(4).setInteractive({ useHandCursor: true })
    image.on('pointerdown', () => {
      if (touchInput.locked || this.entering || this.transitioning) return
      this.walkTo({x:slot.x,y:slot.viewY}, () => {
        this.facing = 'up'
        this.updateNearPainting()
      })
    })
    image.on('pointerover', () => glow.setVisible(true))
    image.on('pointerout', () => glow.setVisible(this.nearArtId === slot.art.id))
    this.add.rectangle(x, slot.y + 23, 14, 4, 0xfff3dc).setDepth(4)
    image.setData('artTitle', slot.art.title)
    // Small brass picture light, aligned over each large frame.
    this.add.rectangle(x, slot.y - 21, 18, 2, 0xe7bb6a).setDepth(4)
  }

  private updateNearPainting() {
    if (!this.hasLivePlayer()) return
    let nearest: PaintingSlot | null = null
    let distance = Infinity
    for (const slot of this.room.paintings) {
      const dx = Math.abs(this.player.x - slot.x), dy = Math.abs(this.player.y - slot.viewY)
      const onPublicSide = this.room.key !== 'portraits' || this.player.y >= slot.viewY-16
      if (onPublicSide && dx < 40 && dy < 36 && dx + dy < distance) { nearest = slot; distance = dx + dy }
    }
    const id = nearest?.art.id ?? null
    if (id !== this.nearArtId) {
      this.nearArtId = id
      this.highlights.forEach((highlight, artId) => highlight.setVisible(artId === id))
      gameEvents.emit(GameEvent.PAINTING_NEAR, { art: nearest?.art ?? null, roomKey: this.room.key })
    }
  }
  private checkDoors() {
    if (!this.hasLivePlayer() || this.transitioning || this.entering) return
    for (const door of this.room.doors) {
      if (this.player.x >= door.x && this.player.x <= door.x + door.w && this.player.y >= door.y && this.player.y <= door.y + door.h) {
        this.changeRoom(door.to, { spawnAt: door.spawnAt, facing: door.facing })
        return
      }
    }
  }
  private tryOpenDialogue() {
    if (!this.hasLivePlayer() || touchInput.locked || this.entering || this.transitioning) return
    if (this.restingAt) { this.standUp(); return }
    const prop = this.nearProp()
    if (prop) { this.cancelWalk(); this.useProp(prop); return }
    if (this.nearArtId == null) return
    const slot = this.room.paintings.find(p => p.art.id === this.nearArtId)
    if (slot) { this.cancelWalk(); this.openPainting(slot) }
  }
  private openPainting(slot: PaintingSlot) {
    if (!this.hasLivePlayer() || this.transitioning) return
    this.facing = 'up'
    this.player.setVelocity(0).anims.stop()
    this.player.setFrame(idleFrame('up'))
    touchInput.locked = true
    gameEvents.emit(GameEvent.DIALOGUE_OPEN, {art:slot.art,roomKey:this.room.key})
  }
}
