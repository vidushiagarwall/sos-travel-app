import { useEffect, useRef, useState } from 'react'
import { useCurrentLocation } from '../location/useCurrentLocation'
import { useNearbyPlaces } from '../maps/useNearbyPlaces'
import { loadGoogleMaps } from '../maps/loadGoogleMaps'

export function MapPage() {
  const { position, error: locationError, loading: locationLoading } = useCurrentLocation()
  const { places, error: placesError, loading: placesLoading } = useNearbyPlaces(position)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<google.maps.Map | null>(null)
  const markers = useRef<google.maps.Marker[]>([])
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    if (!position || !mapRef.current) return
    let cancelled = false

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !mapRef.current) return
        mapInstance.current = new google.maps.Map(mapRef.current, {
          center: position,
          zoom: 15,
        })
        new google.maps.Marker({
          position,
          map: mapInstance.current,
          title: 'You are here',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2,
          },
        })
      })
      .catch((e) => setMapError(e instanceof Error ? e.message : 'Failed to load map.'))

    return () => {
      cancelled = true
    }
  }, [position?.lat, position?.lng])

  useEffect(() => {
    if (!mapInstance.current) return
    markers.current.forEach((m) => m.setMap(null))
    markers.current = places.map(
      (place) =>
        new google.maps.Marker({
          position: place.position,
          map: mapInstance.current!,
          title: place.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
            fillColor: place.category === 'police' ? '#1a73e8' : '#d93025',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 1,
          },
        }),
    )
  }, [places])

  return (
    <div>
      <h1 className="page-title">Nearby Safety</h1>
      <p className="page-sub">Police stations, hospitals and safe places around you right now.</p>
      {locationLoading && <p className="muted">Getting your location…</p>}
      {locationError && <p className="error">{locationError}</p>}
      {mapError && <p className="error">{mapError}</p>}
      <div ref={mapRef} className="map-container" />
      {placesLoading && <p className="muted">Looking for nearby police stations and hospitals…</p>}
      {placesError && <p className="error">{placesError}</p>}
      {!placesLoading && places.length > 0 && (
        <ul className="place-list">
          {places.map((p) => (
            <li key={p.id}>
              <span className={p.category === 'police' ? 'dot police' : 'dot hospital'} />
              {p.name} <span className="muted">({p.category})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
