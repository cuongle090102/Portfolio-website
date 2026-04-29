'use client'

import Link from 'next/link'
import { useLayoutEffect, useRef, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

type Current = 'index' | 'work' | 'favorites' | 'admin' | 'about' | 'none'

const ITEMS: { key: Current; href: string; label: string }[] = [
  { key: 'index', href: '/', label: 'Index' },
  { key: 'work', href: '/projects', label: 'Work' },
  { key: 'favorites', href: '/favorites', label: 'Favorites' },
  { key: 'admin', href: '/admin', label: 'Admin' },
]

export default function TopNav({ current }: { current: Current }) {
  const { isAuthenticated, logout } = useAuth()
  const containerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const [hovered, setHovered] = useState<number | null>(null)
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 })

  const activeIdx = ITEMS.findIndex((i) => i.key === current)

  useLayoutEffect(() => {
    const idx = hovered ?? activeIdx
    if (idx < 0) {
      setPill((p) => ({ ...p, opacity: 0 }))
      return
    }
    const target = itemRefs.current[idx]
    const container = containerRef.current
    if (!target || !container) return
    const cR = container.getBoundingClientRect()
    const tR = target.getBoundingClientRect()
    setPill({ left: tR.left - cR.left, width: tR.width, opacity: 1 })
  }, [hovered, activeIdx, isAuthenticated])

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div
        ref={containerRef}
        onMouseLeave={() => setHovered(null)}
        className="relative bg-white/40 dark:bg-slate-900/60 backdrop-blur-md border border-white/40 dark:border-slate-700/40 rounded-full px-1.5 py-1.5 shadow-lg"
      >
        <div
          aria-hidden
          className="absolute top-1/2 -translate-y-1/2 h-9 bg-black/10 dark:bg-white/15 rounded-full pointer-events-none"
          style={{
            left: pill.left,
            width: pill.width,
            opacity: pill.opacity,
            transition:
              'left 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease',
          }}
        />
        <div className="relative flex items-center">
          {ITEMS.map((item, i) => (
            <Link
              key={item.key}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              href={item.href}
              onMouseEnter={() => setHovered(i)}
              className="px-4 py-1.5 rounded-full text-black dark:text-white text-sm transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated && (
            <button
              ref={(el) => {
                itemRefs.current[ITEMS.length] = el
              }}
              onClick={logout}
              onMouseEnter={() => setHovered(ITEMS.length)}
              className="px-4 py-1.5 rounded-full text-black dark:text-white hover:text-red-600 dark:hover:text-red-400 text-sm transition-colors duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
