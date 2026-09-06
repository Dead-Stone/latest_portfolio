// Run: node lib/game/scene-lifecycle.test.cjs
// Exercises the actual scene class with lightweight engine doubles, without a browser.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const {EventEmitter} = require('node:events')
const ts = require('typescript')
const bridge = new EventEmitter()
const GameEvent = Object.fromEntries(['NAVIGATE','CANCEL_WALK','SKIP_ARRIVAL','ROOM_CHANGED','READY','POSITION','PAINTING_NEAR','HINT','ARRIVAL','EXIT'].map(k=>[k,k]))
const touchInput = {locked:false}
const room = {key:'lobby',width:640,height:512,paintings:[],doors:[],props:[],playerSpawn:{x:320,y:160,facing:'up'}}
const Phaser = {Scene:class {},Scale:{Events:{RESIZE:'resize'}},Core:{Events:{BLUR:'blur'}},Scenes:{Events:{SHUTDOWN:'shutdown',DESTROY:'destroy'}},Cameras:{Scene2D:{Events:{FADE_OUT_COMPLETE:'fade-out'}}}}
const dependencies = {
  phaser:Phaser,'./rooms':{ROOMS:{lobby:room,portraits:{key:'portraits'}},insideRoom:()=>true},
  './gameEvents':{gameEvents:bridge,GameEvent},'./touchInput':{touchInput,resetTouchInput(){}},
  './player':{CHARACTER_KEY:'player',createWalkAnimations(){},createSeatedPose(){},idleFrame:()=>0},
  './assets':{},'./navigation':{walkingPath:()=>[]},'./galleryFurnishings':{},
}
const compiled=ts.transpileModule(fs.readFileSync(path.join(__dirname,'BaseRoomScene.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText
const result={exports:{}}
vm.runInNewContext(compiled,{module:result,exports:result.exports,require:key=>{assert.ok(dependencies[key],key);return dependencies[key]},window:{matchMedia:()=>({matches:false})}})
const Base=result.exports.default
function makeScene(){
  const scene=new Base(), camera=new EventEmitter(), keys=new Map(), timers=[]
  let active=true
  const sprite={x:320,y:480,body:{enable:true,setVelocity(){}},anims:{stop(){}},setVelocity(x,y){this.body.setVelocity(x,y);return this}}
  for(const method of ['setOrigin','setSize','setOffset','setCollideWorldBounds','setFrame','setDepth','setTexture'])sprite[method]=()=>sprite
  sprite.setPosition=(x,y)=>{sprite.x=x;sprite.y=y;return sprite}
  for(const method of ['setBackgroundColor','setRoundPixels','removeBounds','setZoom','setFollowOffset','centerOn','startFollow','fadeIn','fadeOut'])camera[method]=()=>camera
  Object.assign(scene,{
    room,sys:{isActive:()=>active},events:new EventEmitter(),game:{events:new EventEmitter()},
    scale:new EventEmitter(),cameras:{main:camera},registry:{get:()=>false,set(){}},
    physics:{world:{setBounds(){}},add:{staticGroup:()=>({}),sprite:()=>sprite,collider(){}}},
    input:Object.assign(new EventEmitter(),{keyboard:{createCursorKeys:()=>({}),addKey:key=>{if(!keys.has(key))keys.set(key,new EventEmitter());return keys.get(key)},resetKeys(){}}}),
    time:{delayedCall:(_delay,callback)=>{const timer={callback,removed:false,remove(){this.removed=true}};timers.push(timer);return timer}},
    buildMuseum(){},renderPainting(){},scene:{start(){}},
  })
  scene.create()
  return {scene,sprite,camera,keys,timers,setActive:value=>{active=value}}
}
for(const end of ['shutdown','destroy']){
  const {scene,sprite,camera,keys,timers,setActive}=makeScene()
  assert.equal(bridge.listenerCount(GameEvent.NAVIGATE),1)
  const lateNavigate=bridge.listeners(GameEvent.NAVIGATE)[0]
  // Phaser may already have removed the physics body when a queued callback runs.
  sprite.body=undefined
  scene.entering=false
  assert.doesNotThrow(()=>lateNavigate('portraits'))
  scene.events.emit(end)
  setActive(false)
  for(const name of ['NAVIGATE','CANCEL_WALK','SKIP_ARRIVAL'])assert.equal(bridge.listenerCount(GameEvent[name]),0,`${end}: ${name} leaked`)
  assert.equal(scene.input.listenerCount('pointerdown'),0)
  assert.equal(scene.scale.listenerCount('resize'),0)
  assert.equal(keys.get('E').listenerCount('down'),0)
  assert.equal(scene.game.events.listenerCount('blur'),0)
  assert.equal(scene.events.listenerCount('destroy'),0)
  assert.equal(scene.events.listenerCount('shutdown'),0)
  assert.equal(scene.events.listenerCount('render'),0)
  assert.ok(timers.every(t=>t.removed))
  assert.doesNotThrow(()=>{lateNavigate('portraits');timers.forEach(t=>t.callback());camera.emit('fade-out');scene.update(0,16);scene.useProp({tile:40,x:0,y:0});scene.openPainting({});scene.walkTo({x:0,y:0})})
}
// Pending camera fade is detached when the whole game is destroyed mid-transition.
{
  const {scene,camera}=makeScene()
  scene.entering=false
  scene.changeRoom('portraits')
  assert.equal(camera.listenerCount('fade-out'),1)
  scene.events.emit('destroy')
  assert.equal(camera.listenerCount('fade-out'),0)
}
// Multiple mounts never accumulate old bridge callbacks.
for(let i=0;i<5;i++){const {scene}=makeScene();assert.equal(bridge.listenerCount(GameEvent.NAVIGATE),1);scene.events.emit('destroy')}
assert.equal(bridge.listenerCount(GameEvent.NAVIGATE),0)
// Proximity previews depend on distance, not facing direction or movement.
{
  const {scene,sprite}=makeScene(), previews=[]
  const art={id:1000,title:'Proximity test'}
  scene.room={...room,paintings:[{x:320,y:400,viewY:456,art}]}
  const receive=payload=>previews.push(payload.art)
  bridge.on(GameEvent.PAINTING_NEAR,receive)
  sprite.setPosition(320,456)
  sprite.body.velocity={x:90,y:0}
  scene.facing='right'
  scene.updateNearPainting()
  assert.equal(previews.at(-1),art,'Shows while walking nearby, regardless of facing')
  sprite.setPosition(400,456)
  scene.updateNearPainting()
  assert.equal(previews.at(-1),null,'Dismisses outside viewing range')
  scene.room={...scene.room,key:'portraits'}
  sprite.setPosition(320,436)
  scene.updateNearPainting()
  assert.equal(previews.at(-1),null,'Premium ropes keep the public-side constraint')
  bridge.off(GameEvent.PAINTING_NEAR,receive)
  scene.events.emit('destroy')
}
console.log('PASS: scene cleanup, missing bodies, repeated mounts, and proximity previews while moving or facing away.')
