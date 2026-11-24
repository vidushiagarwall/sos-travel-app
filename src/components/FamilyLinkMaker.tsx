import { useState } from 'react'
import { DESTINATIONS } from '../data/familyPlan'
import { makeFamilyLink } from '../sharing/familyLink'

// The traveller fills this in and shares the "If you cannot reach me" link.
// Nothing is saved: the details go into the link only.
export function FamilyLinkMaker() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [hotel, setHotel] = useState('')
  const [hotelPhone, setHotelPhone] = useState('')
  const [hotelAddress, setHotelAddress] = useState('')
  const [dest, setDest] = useState(DESTINATIONS[0].code)
  const [link, setLink] = useState('')
  const [copied, setCopied] = useState(false)

  function handleMake(e: React.FormEvent) {
    e.preventDefault()
    setCopied(false)
    setLink(
      makeFamilyLink({
        name: name.trim(),
        phone: phone.trim(),
        hotel: hotel.trim(),
        hotelPhone: hotelPhone.trim(),
        hotelAddress: hotelAddress.trim(),
        dest,
        made: new Date().toISOString().slice(0, 10),
      }),
    )
  }

  const message = `If you ever can't reach me on my trip, open this. It shows what to do, step by step: ${link}`

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: `If you cannot reach ${name.trim()}`, text: message })
        return
      } catch {
        // cancelled, fall through to copy
      }
    }
    handleCopy()
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="card family-maker">
      <h2>"If you cannot reach me" link for family</h2>
      <p className="muted">
        Fill this in and send the link home. It tells your family what to do, in order, if they can't
        reach you. Nothing is saved anywhere: your details live only inside the link.
      </p>

      <form className="form" onSubmit={handleMake}>
        <label className="field">
          <span>Your name</span>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} required />
        </label>
        <label className="field">
          <span>Your phone, with country code</span>
          <input
            className="input"
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={30}
          />
        </label>
        <label className="field">
          <span>Where are you going?</span>
          <select className="input" value={dest} onChange={(e) => setDest(e.target.value)}>
            {DESTINATIONS.map((d) => (
              <option key={d.code} value={d.code}>
                {d.city}, {d.country}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Hotel name</span>
          <input className="input" value={hotel} onChange={(e) => setHotel(e.target.value)} maxLength={100} />
        </label>
        <label className="field">
          <span>Hotel phone, with country code</span>
          <input
            className="input"
            type="tel"
            placeholder="+84 24 1234 5678"
            value={hotelPhone}
            onChange={(e) => setHotelPhone(e.target.value)}
            maxLength={30}
          />
        </label>
        <label className="field">
          <span>Hotel address (optional)</span>
          <input
            className="input"
            value={hotelAddress}
            onChange={(e) => setHotelAddress(e.target.value)}
            maxLength={120}
          />
        </label>
        <button className="btn btn-primary btn-block" type="submit">
          Make my link
        </button>
      </form>

      {link && (
        <div className="family-made">
          <p>
            <strong>Your link is ready.</strong> Send it to your family before you fly.
          </p>
          <div className="family-made-actions">
            <button className="btn btn-primary" onClick={handleShare}>
              Share link
            </button>
            <a
              className="btn btn-ghost"
              href={`https://wa.me/?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noreferrer"
            >
              Send on WhatsApp
            </a>
            <button className="btn btn-ghost" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy link'}
            </button>
            <a className="btn btn-ghost" href={link} target="_blank" rel="noreferrer">
              See what they'll see
            </a>
          </div>
          <p className="muted family-made-note">
            Changed hotels? Fill this in again and send the new link.
          </p>
        </div>
      )}
    </section>
  )
}
