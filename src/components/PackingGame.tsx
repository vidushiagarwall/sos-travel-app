import { useState } from 'react'
import { Confetti } from './Confetti'

type Item = { id: string; emoji: string; label: string; good: boolean; note?: string }

const ITEMS: Item[] = [
  { id: 'power', emoji: '🔋', label: 'Power bank', good: true },
  { id: 'heels', emoji: '👠', label: 'Heels for running', good: false, note: 'Cute, but not for running.' },
  { id: 'passport', emoji: '🪪', label: 'Passport copy', good: true },
  { id: 'map', emoji: '🗺️', label: 'Offline map', good: true },
  { id: 'post', emoji: '📸', label: 'Posting your hotel live', good: false, note: 'Post it after you check out!' },
  { id: 'alarm', emoji: '📣', label: 'Personal alarm', good: true },
  { id: 'cash', emoji: '💵', label: 'Some local cash', good: true },
  { id: 'wallet', emoji: '👛', label: 'All cash in one wallet', good: false, note: 'Split it up between pockets.' },
  { id: 'door', emoji: '🚪', label: 'Doorstop wedge', good: true },
]

const GOOD_COUNT = ITEMS.filter((i) => i.good).length

export function PackingGame() {
  const [packed, setPacked] = useState<string[]>([])
  const [oops, setOops] = useState<Item | null>(null)
  // bumped on every wrong pick so the wiggle replays even on the same item
  const [oopsCount, setOopsCount] = useState(0)
  const done = packed.length === GOOD_COUNT

  function pick(item: Item) {
    if (packed.includes(item.id)) return
    if (!item.good) {
      setOops(item)
      setOopsCount(oopsCount + 1)
      return
    }
    setOops(null)
    setPacked([...packed, item.id])
  }

  return (
    <div className="packing">
      <div className="packing-items">
        {ITEMS.map((item) => {
          const isPacked = packed.includes(item.id)
          const isOops = oops?.id === item.id
          return (
            <button
              key={isOops ? `${item.id}-${oopsCount}` : item.id}
              type="button"
              className={`pack-item${isPacked ? ' packed' : ''}${isOops ? ' oops' : ''}`}
              onClick={() => pick(item)}
              disabled={isPacked}
            >
              <span className="pack-emoji">{item.emoji}</span>
              {item.label}
            </button>
          )
        })}
      </div>

      <div className={done ? 'suitcase done' : 'suitcase'}>
        <div className="suitcase-handle" />
        <div className="suitcase-body">
          {packed.length === 0 && <span className="suitcase-empty">your bag is empty</span>}
          {packed.map((id) => (
            <span key={id} className="in-bag">
              {ITEMS.find((i) => i.id === id)?.emoji}
            </span>
          ))}
        </div>
        <div className="pack-progress" aria-label={`${packed.length} of ${GOOD_COUNT} packed`}>
          <span style={{ width: `${(packed.length / GOOD_COUNT) * 100}%` }} />
        </div>
        <p className="pack-status">
          {done
            ? 'Bag packed. You are so ready!'
            : oops
              ? `Hmm, no. ${oops.note}`
              : `${packed.length} of ${GOOD_COUNT} packed`}
        </p>
        {done && (
          <button className="btn btn-ghost" type="button" onClick={() => setPacked([])}>
            Unpack and play again
          </button>
        )}
      </div>

      {done && <Confetti />}
    </div>
  )
}
