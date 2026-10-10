import { useState } from 'react'
import emergencyNumbers from '../data/emergencyNumbers.json'
import type { EmergencyNumberEntry } from '../types/emergency'

const numbers = emergencyNumbers as EmergencyNumberEntry[]
const QUICK_PICKS = ['Japan', 'France', 'Thailand', 'India', 'Greece']

export function Postcard() {
  const [query, setQuery] = useState('')
  const [picked, setPicked] = useState<EmergencyNumberEntry | null>(null)
  const [missing, setMissing] = useState<string | null>(null)
  const [flipped, setFlipped] = useState(false)

  function choose(name: string) {
    const match = numbers.find((n) => n.countryName.toLowerCase() === name.trim().toLowerCase())
    if (!match) {
      setMissing(name.trim())
      setFlipped(false)
      return
    }
    setMissing(null)
    setPicked(match)
    setQuery('')
    setFlipped(true)
  }

  function surprise() {
    const others = numbers.filter((n) => n.countryCode !== picked?.countryCode)
    choose(others[Math.floor(Math.random() * others.length)].countryName)
  }

  return (
    <div className="postcard-wrap">
      <form
        className="postcard-search"
        onSubmit={(e) => {
          e.preventDefault()
          if (query.trim()) choose(query)
        }}
      >
        <input
          className="input"
          list="countries"
          placeholder="Type a country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Country"
        />
        <datalist id="countries">
          {numbers.map((n) => (
            <option key={n.countryCode} value={n.countryName} />
          ))}
        </datalist>
        <button className="btn btn-primary" type="submit">
          Go
        </button>
        <button className="btn btn-ghost dice" type="button" onClick={surprise} title="Surprise me">
          🎲 <span>Surprise me</span>
        </button>
      </form>

      <div className="quick-picks">
        {QUICK_PICKS.map((name) => (
          <button key={name} className="chip chip-btn" type="button" onClick={() => choose(name)}>
            {name}
          </button>
        ))}
      </div>

      {missing && (
        <p className="muted postcard-missing">
          We don't have {missing} yet. It's on the list!
        </p>
      )}

      <button
        type="button"
        className={flipped ? 'postcard flipped' : 'postcard'}
        onClick={() => picked && setFlipped(!flipped)}
        aria-label={flipped ? 'Flip postcard back' : 'Flip postcard'}
      >
        <div className="postcard-inner">
          <div className="postcard-face front">
            <span className="postcard-hello">Greetings from</span>
            <span className="postcard-place">{picked ? picked.countryName : 'anywhere'}</span>
            <span className="stamp">{picked ? picked.countryCode : '✈'}</span>
            <span className="postcard-hint">{picked ? 'tap to flip' : 'pick a place above'}</span>
          </div>
          <div className="postcard-face back">
            <span className="postmark">
              {picked?.countryCode}
              <br />
              SAFE
            </span>
            <h3>Save these before you land</h3>
            {picked && (
              <ul className="postcard-numbers">
                <li>
                  <span>Police</span>
                  <strong>{picked.police}</strong>
                </li>
                <li>
                  <span>Ambulance</span>
                  <strong>{picked.ambulance}</strong>
                </li>
                <li>
                  <span>Fire</span>
                  <strong>{picked.fire}</strong>
                </li>
                {picked.general && (
                  <li>
                    <span>Any emergency</span>
                    <strong>{picked.general}</strong>
                  </li>
                )}
              </ul>
            )}
            <p className="postcard-note">From our starter list. Double check when you arrive.</p>
          </div>
        </div>
      </button>
    </div>
  )
}
