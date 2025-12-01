import * as React from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Initialize with a safe default that works for SSR
  // Use a function to check if we're on mobile based on user agent or window size
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // SSR-safe: default to false, will be updated on client
    if (typeof window === 'undefined') return false
    // Check on initial render if window is available
    return window.innerWidth < MOBILE_BREAKPOINT
  })

  React.useEffect(() => {
    // Use matchMedia instead of reading window.innerWidth to avoid forced reflow
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // Use matchMedia.matches instead of window.innerWidth
      setIsMobile(e.matches)
    }
    mql.addEventListener('change', onChange)
    // Initial check without reading layout properties
    setIsMobile(mql.matches)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
