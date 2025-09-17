// hooks/useActiveSection.tsx
'use client'
import { useEffect, useState } from 'react'

export default function useActiveSection(ids: string[], rootMargin = '-40% 0px -40% 0px') {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    if (!elements.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        // pick the entry with largest intersectionRatio (most visible)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { root: null, rootMargin, threshold: [0.15, 0.35, 0.6] }
    )

    elements.forEach((el) => obs.observe(el))
    // set initial based on scroll position
    const initial = elements.find((el) => {
      const rect = el.getBoundingClientRect()
      return rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4
    })
    if (initial) setActive(initial.id)

    return () => obs.disconnect()
  }, [ids.join('|'), rootMargin])

  return active
}
