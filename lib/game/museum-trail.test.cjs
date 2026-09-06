const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript')
const root=path.resolve(__dirname,'../..'),cache=new Map()
function load(file){
  file=path.resolve(file);if(cache.has(file))return cache.get(file).exports
  const module={exports:{}};cache.set(file,module)
  const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText
  vm.runInNewContext(code,{module,exports:module.exports,require:key=>load(path.resolve(key.startsWith('@/')?root:path.dirname(file),key.replace(/^@\//,''))+'.ts')})
  return module.exports
}
const {ROOMS}=load(path.join(__dirname,'rooms.ts'))
const {roomObstacles}=load(path.join(__dirname,'museumTrail.ts'))
const {walkingPath}=load(path.join(__dirname,'navigation.ts'))
let artworks=0
for(const room of Object.values(ROOMS)){
  const obstacles=roomObstacles(room)
  assert.ok(room.guideRoute.length>=2,`${room.key}: missing simple guide route`)
  for(let i=1;i<room.guideRoute.length;i++){
    const a=room.guideRoute[i-1],b=room.guideRoute[i]
    assert.ok(a.x===b.x||a.y===b.y,`${room.key}: diagonal guide segment`)
    const distance=Math.abs(a.x-b.x)+Math.abs(a.y-b.y)
    for(let j=0;j<=distance;j++){
      const x=a.x+Math.sign(b.x-a.x)*j,y=a.y+Math.sign(b.y-a.y)*j
      assert.ok(!obstacles.some(r=>x+7>r.x&&x-7<r.x+r.w&&y-1>r.y&&y-11<r.y+r.h),`${room.key}: guide collision ${x},${y}`)
    }
  }
  const baseline=[room.route[0]]
  for(const target of [...room.paintings.map(p=>({x:p.x,y:p.viewY})),room.route.at(-1)]){
    baseline.push(...walkingPath(baseline.at(-1),target,room.width,room.height,obstacles))
  }
  const length=points=>points.slice(1).reduce((sum,p,i)=>sum+Math.abs(p.x-points[i].x)+Math.abs(p.y-points[i].y),0)
  assert.ok(length(room.route)<=length(baseline),`${room.key}: new route must not add walking distance`)
  console.log(`${room.key}: route ${length(baseline)} → ${length(room.route)} pixels`)
  for(const art of room.paintings){assert.ok(room.route.some(p=>p.x===art.x&&p.y===art.viewY),`${room.key}: missing ${art.art.title}`);artworks++}
  for(let i=1;i<room.route.length;i++){
    const a=room.route[i-1],b=room.route[i]
    assert.ok(a.x===b.x||a.y===b.y,`${room.key}: diagonal corner cut`)
    const distance=Math.abs(a.x-b.x)+Math.abs(a.y-b.y)
    for(let j=0;j<=distance;j++){
      const x=a.x+Math.sign(b.x-a.x)*j,y=a.y+Math.sign(b.y-a.y)*j
      assert.ok(!obstacles.some(r=>x+7>r.x&&x-7<r.x+r.w&&y-1>r.y&&y-11<r.y+r.h),`${room.key}: collision ${x},${y}`)
    }
  }
  console.log(`${room.title}: ${room.paintings.length} viewing stops, clear of all walls, furniture and ropes`)
}
assert.equal(artworks,29)
console.log('PASS: all 29 artworks visited, every trail pixel clears the padded player foot box.')
