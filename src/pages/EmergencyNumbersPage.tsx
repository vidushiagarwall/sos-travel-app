import { useState } from 'react'
import { COUNTRY_EMERGENCY, type EmergencyContact } from '../data/countryEmergency'

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function CallButton({ contact }: { contact: EmergencyContact }) {
  return (
    <div className="call-item">
      <a className={`call-btn call-${contact.kind}`} href={`tel:${contact.dial}`}>
        <span className="call-label">{contact.label}</span>
        <span className="call-number">{contact.number}</span>
        <span className="call-desc">{contact.description}</span>
      </a>
      <p className="call-source">
        Source:{' '}
        <a href={contact.source.url} target="_blank" rel="noreferrer">
          {contact.source.name}
        </a>
      </p>
    </div>
  )
}

export function EmergencyNumbersPage() {
  const [code, setCode] = useState(COUNTRY_EMERGENCY[0].code)
  const country = COUNTRY_EMERGENCY.find((c) => c.code === code) ?? COUNTRY_EMERGENCY[0]

  const emergency = country.contacts.filter((c) => c.kind === 'emergency')
  const others = country.contacts.filter((c) => c.kind !== 'emergency')

  return (
    <div className="numbers-page">
      <h1 className="page-title">Emergency numbers</h1>

      {COUNTRY_EMERGENCY.length > 1 ? (
        <label className="field">
          <span>Country</span>
          <select className="input" value={code} onChange={(e) => setCode(e.target.value)}>
            {COUNTRY_EMERGENCY.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <p className="page-sub">{country.name}. Tap a number to call.</p>
      )}

      <p className="numbers-first">In danger? Call the local emergency number first.</p>

      <div className="call-list">
        {emergency.map((c) => (
          <CallButton key={c.label} contact={c} />
        ))}
      </div>

      {country.tips.map((t) => (
        <p key={t.text} className="numbers-tip">
          {t.text}{' '}
          <a href={t.source.url} target="_blank" rel="noreferrer">
            (source)
          </a>
        </p>
      ))}

      <h2 className="numbers-h2">
        {others.some((c) => c.kind === 'embassy') ? 'Embassy and helplines' : 'Helplines'}
      </h2>
      <div className="call-list">
        {others.map((c) => (
          <CallButton key={c.label} contact={c} />
        ))}
      </div>

      {country.notYetConfirmed.map((n) => (
        <div key={n.label} className="card numbers-missing">
          <strong>{n.label}</strong>
          <p className="muted">{n.note}</p>
        </div>
      ))}

      <p className="disclaimer">
        Last checked {formatDate(country.lastChecked)}. HerWay doesn't replace emergency services.
        Numbers can change, so tap a source to double check.
      </p>
    </div>
  )
}
