import { useEffect, useState } from 'react'

// Decide once per page load, so StrictMode double renders don't matter.
function shouldPlay() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    if (sessionStorage.getItem('herway-intro')) return false
    sessionStorage.setItem('herway-intro', '1')
  } catch {
    // storage blocked, just play it
  }
  return true
}

const playOnLoad = shouldPlay()
const FLIGHT = 'M30 250 C 120 120, 220 300, 300 170 S 420 90, 470 140'

export function IntroSplash() {
  const [stage, setStage] = useState<'playing' | 'leaving' | 'done'>(playOnLoad ? 'playing' : 'done')

  useEffect(() => {
    if (stage === 'playing') {
      const t = setTimeout(() => setStage('leaving'), 2600)
      return () => clearTimeout(t)
    }
    if (stage === 'leaving') {
      const t = setTimeout(() => setStage('done'), 500)
      return () => clearTimeout(t)
    }
  }, [stage])

  if (stage === 'done') return null

  return (
    <div
      className={stage === 'leaving' ? 'splash leaving' : 'splash'}
      onClick={() => setStage('leaving')}
      role="presentation"
    >
      <svg className="splash-art" viewBox="0 0 520 320" aria-hidden="true">
        <defs>
          <mask id="trail-mask">
            <path className="trail-reveal" d={FLIGHT} stroke="#fff" strokeWidth="10" fill="none" />
          </mask>
        </defs>
        <path
          d={FLIGHT}
          stroke="#fff"
          strokeOpacity="0.7"
          strokeWidth="3"
          strokeDasharray="2 12"
          strokeLinecap="round"
          fill="none"
          mask="url(#trail-mask)"
        />
        <g className="splash-pin">
          <path
            d="M470 104c11 0 20 8.5 20 19 0 13.5-20 31-20 31s-20-17.5-20-31c0-10.5 9-19 20-19Z"
            fill="#e05260"
          />
          <circle cx="470" cy="123" r="7" fill="#fff" />
        </g>
        <path d="M-14 -10 L16 0 L-14 10 L-7 0 Z" fill="#fff">
          <animateMotion dur="1.6s" path={FLIGHT} rotate="auto" fill="freeze" />
        </path>
      </svg>
      <p className="splash-word">
        Her<b>Way</b>
      </p>
      <p className="splash-skip">tap to skip</p>
    </div>
  )
}
