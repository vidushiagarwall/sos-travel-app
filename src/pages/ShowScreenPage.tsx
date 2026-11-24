import { useEffect, useRef, useState } from 'react'
import { SHOW_CARDS } from '../data/showCards'

// Keeps the phone screen awake while the cards are open, where supported.
function useKeepScreenOn() {
  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null
    const nav = navigator as Navigator & {
      wakeLock?: { request: (type: 'screen') => Promise<{ release: () => Promise<void> }> }
    }
    const request = () => {
      nav.wakeLock
        ?.request('screen')
        .then((l) => (lock = l))
        .catch(() => {})
    }
    request()
    // The lock drops when the tab is hidden, so ask again when she comes back
    const onVisible = () => document.visibilityState === 'visible' && request()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      lock?.release().catch(() => {})
    }
  }, [])
}

export function ShowScreenPage({ onClose }: { onClose: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  useKeepScreenOn()

  const goTo = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const next = Math.max(0, Math.min(SHOW_CARDS.length - 1, i))
    track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' })
  }

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    setIndex(Math.round(track.scrollLeft / track.clientWidth))
  }

  // Arrow keys and Escape, for laptops
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(index + 1)
      if (e.key === 'ArrowLeft') goTo(index - 1)
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="show-screen" role="dialog" aria-modal="true" aria-label="Show this screen">
      <div className="show-top">
        <span className="show-count">
          {index + 1} of {SHOW_CARDS.length}
        </span>
        <button className="show-close" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="show-track" ref={trackRef} onScroll={onScroll}>
        {SHOW_CARDS.map((card, i) => (
          <section
            key={card.id}
            className="show-card"
            aria-hidden={i !== index}
            aria-label={`Card ${i + 1} of ${SHOW_CARDS.length}`}
          >
            <span className="show-emoji" aria-hidden="true">
              {card.emoji}
            </span>
            <p className="show-hi" lang="hi">
              {card.text.hi}
            </p>
            <p className="show-en" lang="en">
              {card.text.en}
            </p>
          </section>
        ))}
      </div>

      <div className="show-bottom">
        <button className="show-nav" onClick={() => goTo(index - 1)} disabled={index === 0}>
          ‹ Back
        </button>
        <div className="show-dots" aria-hidden="true">
          {SHOW_CARDS.map((c, i) => (
            <span key={c.id} className={i === index ? 'on' : ''} />
          ))}
        </div>
        <button
          className="show-nav"
          onClick={() => goTo(index + 1)}
          disabled={index === SHOW_CARDS.length - 1}
        >
          Next ›
        </button>
      </div>
    </div>
  )
}
