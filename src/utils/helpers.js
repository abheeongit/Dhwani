/** Format seconds → m:ss */
export function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** Clamp a number between min and max */
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}

/** Simple cn() — joins class strings, filtering falsy */
export function cn(...args) {
  return args.filter(Boolean).join(' ')
}

/** Generate placeholder gradient by seed */
export function gradientFromSeed(seed = 0) {
  const hues = [
    ['#6f5cff', '#35d7ff'],
    ['#ff5c8a', '#ffba5c'],
    ['#5cff9d', '#5cc6ff'],
    ['#ff5cdc', '#5c6fff'],
    ['#ffd95c', '#ff5c5c'],
    ['#5cffec', '#9d5cff'],
  ]
  const pair = hues[Math.abs(seed) % hues.length]
  return `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`
}

/** Truncate text with ellipsis */
export function truncate(str, len = 28) {
  if (!str) return ''
  return str.length > len ? str.slice(0, len) + '…' : str
}
