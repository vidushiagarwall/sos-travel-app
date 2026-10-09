/** Minimal line icons (stroke=currentColor) used across nav and features. */
import type { SVGProps } from 'react'

const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const IconMap = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2Z" />
    <path d="M9 3v16M15 5v16" />
  </svg>
)

export const IconShield = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5c0 5 3.5 8 7 10 3.5-2 7-5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const IconUsers = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 5.2a3 3 0 0 1 0 5.6M20.5 20a5 5 0 0 0-3.3-4.7" />
  </svg>
)

export const IconRoute = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="19" r="2.2" />
    <circle cx="18" cy="5" r="2.2" />
    <path d="M8 19h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h4" />
  </svg>
)

export const IconInfo = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
)

export const IconSOS = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M12 3 3 20h18L12 3Z" />
    <path d="M12 10v4M12 17h.01" />
  </svg>
)

export const IconBell = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
)

export const IconPin = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
)

export const IconHeart = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base} {...p}>
    <path d="M12 20s-7-4.4-9.2-8.6C1.2 8 3 4.5 6.4 4.5c2 0 3.2 1.1 3.9 2.2l1.7 2.6M12 20s7-4.4 9.2-8.6C22.8 8 21 4.5 17.6 4.5c-2 0-3.2 1.1-3.9 2.2L12 9.3" />
  </svg>
)
