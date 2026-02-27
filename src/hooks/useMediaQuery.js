import { useEffect, useState } from 'react'

/** Returns true when viewport width ≤ breakpoint (px) */
export default function useMediaQuery(breakpoint = 900) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const handler = (e) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [breakpoint])

  return matches
}
