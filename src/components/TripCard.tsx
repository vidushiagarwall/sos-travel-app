import type { SavedTrip } from '../types/trip'

export function TripCard({
  trip,
  onShare,
  onRemove,
}: {
  trip: SavedTrip
  onShare: (trip: SavedTrip) => void
  onRemove: (id: string) => void
}) {
  return (
    <li className="trip-card">
      <div>
        <strong>{trip.title}</strong>
        <div className="muted">
          {trip.originText} → {trip.destinationText}
        </div>
        {trip.notes && <div className="muted">{trip.notes}</div>}
      </div>
      <div className="trip-actions">
        <button className="link-button" onClick={() => onShare(trip)}>
          Share
        </button>
        <button className="link-button" onClick={() => onRemove(trip.id)}>
          Remove
        </button>
      </div>
    </li>
  )
}
