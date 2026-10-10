import { useState } from 'react'

export function PracticeSOS() {
  const [state, setState] = useState<'idle' | 'holding' | 'sent'>('idle')

  function release() {
    if (state === 'holding') setState('idle')
  }

  return (
    <div className="practice">
      <button
        type="button"
        className={`practice-btn ${state}`}
        onPointerDown={() => state !== 'sent' && setState('holding')}
        onPointerUp={release}
        onPointerLeave={release}
        onContextMenu={(e) => e.preventDefault()}
        onAnimationEnd={(e) => e.animationName === 'fill-ring' && setState('sent')}
        aria-label="Practice SOS, press and hold"
      >
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="44" className="ring-track" />
          <circle cx="50" cy="50" r="44" className="ring-fill" />
        </svg>
        <span>{state === 'sent' ? '✓' : 'SOS'}</span>
      </button>
      <p className="practice-text">
        {state === 'idle' && 'Press and hold to try it. Nothing gets sent, promise.'}
        {state === 'holding' && 'Keep holding...'}
        {state === 'sent' && 'That\'s it! Your people would have your location by now.'}
      </p>
      {state === 'sent' && (
        <button className="link-button" type="button" onClick={() => setState('idle')}>
          Try again
        </button>
      )}
    </div>
  )
}
