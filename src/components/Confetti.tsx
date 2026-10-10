import { useMemo } from 'react'

const COLORS = ['#2e8b8b', '#9a8cc2', '#e05260', '#f2c14e', '#7fc8c8']

export function Confetti({ pieces = 70 }: { pieces?: number }) {
  const bits = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 1.8 + Math.random() * 1.4,
        spin: Math.random() * 720 - 360,
        color: COLORS[i % COLORS.length],
        round: i % 3 === 0,
      })),
    [pieces],
  )

  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <span
          key={i}
          className={b.round ? 'round' : undefined}
          style={
            {
              left: `${b.left}%`,
              background: b.color,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
              '--spin': `${b.spin}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
