import type { PlanRect, Point } from './rooms'

/** Foot-box routing uses the same rectangles as Arcade collision, not the artwork bounds. */
export function walkingPath(start: Point, target: Point, width: number, height: number, obstacles: PlanRect[]): Point[] | null {
  const step = 4
  const clear = (x: number, y: number) => x >= 14 && x <= width - 14 && y >= 10 && y <= height &&
    !obstacles.some(r => x + 7 > r.x && x - 7 < r.x + r.w && y - 1 > r.y && y - 11 < r.y + r.h)
  const snap = (p: Point) => ({ x: Math.round(p.x / step) * step, y: Math.round(p.y / step) * step })
  const a = snap(start), b = snap(target)
  if (!clear(b.x, b.y)) return null
  const key = (p: Point) => p.y * (width + 1) + p.x
  const queue = [a], visited = new Map<number, Point | null>([[key(a), null]])
  for (let i = 0; i < queue.length; i++) {
    const p = queue[i]
    if (p.x === b.x && p.y === b.y) {
      const path: Point[] = []
      let current: Point | null = p
      while (current) { path.push(current); current = visited.get(key(current)) ?? null }
      const ordered = path.reverse()
      return ordered.filter((point,index) => {
        if (!index) return false
        if (index === ordered.length-1) return true
        const before = ordered[index-1], after = ordered[index+1]
        return point.x-before.x !== after.x-point.x || point.y-before.y !== after.y-point.y
      })
    }
    for (const [dx, dy] of [[step, 0], [-step, 0], [0, step], [0, -step]]) {
      const next = { x: p.x + dx, y: p.y + dy }
      if (!visited.has(key(next)) && clear(next.x, next.y)) {
        visited.set(key(next), p); queue.push(next)
      }
    }
  }
  return null
}
