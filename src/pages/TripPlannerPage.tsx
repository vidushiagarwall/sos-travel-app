import { useState } from 'react'
import { useDirections } from '../maps/useDirections'
import { addTrip, getAllTrips, removeTrip } from '../storage/tripsStore'
import type { SavedTrip } from '../types/trip'
import { TripCard } from '../components/TripCard'
import { buildDirectionsUrl, buildTripShareMessage } from '../sharing/sosMessage'
import { getAllContacts } from '../storage/contactsStore'
import { buildSmsLink, buildWhatsAppLink, copyToClipboard } from '../sharing/shareLinks'

export function TripPlannerPage() {
  const [title, setTitle] = useState('')
  const [originText, setOriginText] = useState('')
  const [destinationText, setDestinationText] = useState('')
  const [trips, setTrips] = useState<SavedTrip[]>(getAllTrips())
  const [shareState, setShareState] = useState<{ trip: SavedTrip; message: string } | null>(null)
  const [copied, setCopied] = useState(false)
  const { getRoute, error: routeError, loading } = useDirections()

  const contacts = getAllContacts()

  async function handlePlan(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !originText.trim() || !destinationText.trim()) return

    const geocoder = new google.maps.Geocoder()
    const [originResult] = (await geocoder.geocode({ address: originText })).results
    const [destResult] = (await geocoder.geocode({ address: destinationText })).results
    if (!originResult || !destResult) return

    const originCoords = { lat: originResult.geometry.location.lat(), lng: originResult.geometry.location.lng() }
    const destinationCoords = { lat: destResult.geometry.location.lat(), lng: destResult.geometry.location.lng() }

    const route = await getRoute(originCoords, destinationCoords)

    addTrip({
      title: title.trim(),
      originText,
      originCoords,
      destinationText,
      destinationCoords,
      encodedPolyline: route?.encodedPolyline,
    })
    setTrips(getAllTrips())
    setTitle('')
    setOriginText('')
    setDestinationText('')
  }

  function handleShare(trip: SavedTrip) {
    const url = buildDirectionsUrl(trip.originCoords, trip.destinationCoords)
    const message = buildTripShareMessage(trip.title, trip.originText, trip.destinationText, url)
    setShareState({ trip, message })
  }

  function handleRemove(id: string) {
    removeTrip(id)
    setTrips(getAllTrips())
  }

  async function handleCopy() {
    if (!shareState) return
    const ok = await copyToClipboard(shareState.message)
    setCopied(ok)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h1 className="page-title">Trips</h1>
      <p className="page-sub">Plan a route and share it with your trusted contacts before you head out.</p>

      <form onSubmit={handlePlan} className="form card">
        <input placeholder="Trip name" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input placeholder="Starting point" value={originText} onChange={(e) => setOriginText(e.target.value)} required />
        <input
          placeholder="Destination"
          value={destinationText}
          onChange={(e) => setDestinationText(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Planning route…' : 'Save trip'}
        </button>
      </form>
      {routeError && <p className="error">{routeError}</p>}

      {trips.length === 0 ? (
        <p className="muted">No saved trips yet.</p>
      ) : (
        <ul className="list">
          {trips.map((t) => (
            <TripCard key={t.id} trip={t} onShare={handleShare} onRemove={handleRemove} />
          ))}
        </ul>
      )}

      {shareState && (
        <div className="sos-panel">
          <p className="message-preview">{shareState.message}</p>
          {contacts.length === 0 && <p className="error">Add trusted contacts first to send this.</p>}
          <div className="button-row">
            <a className="btn btn-primary" href={buildSmsLink(contacts.map((c) => c.phoneNumber), shareState.message)}>
              Send via SMS
            </a>
            <a
              className="btn btn-primary"
              href={buildWhatsAppLink(shareState.message, contacts[0]?.phoneNumber)}
              target="_blank"
              rel="noreferrer"
            >
              Send via WhatsApp
            </a>
            <button className="btn btn-ghost" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy message'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
