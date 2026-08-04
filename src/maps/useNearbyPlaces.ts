import { useEffect, useState } from 'react'
import { loadGoogleMaps } from './loadGoogleMaps'
import type { LatLng } from '../types/trip'

export type NearbyPlace = {
  id: string
  name: string
  category: 'police' | 'hospital'
  position: LatLng
  address?: string
}

const SEARCH_RADIUS_METERS = 3000

export function useNearbyPlaces(center: LatLng | null) {
  const [places, setPlaces] = useState<NearbyPlace[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!center) return
    let cancelled = false

    async function run() {
      setLoading(true)
      setError(null)
      try {
        const google = await loadGoogleMaps()
        const service = new google.maps.places.PlacesService(document.createElement('div'))

        const search = (type: 'police' | 'hospital') =>
          new Promise<NearbyPlace[]>((resolve) => {
            service.nearbySearch(
              {
                location: center as google.maps.LatLngLiteral,
                radius: SEARCH_RADIUS_METERS,
                type,
              },
              (results, status) => {
                if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
                  resolve([])
                  return
                }
                resolve(
                  results
                    .filter((r) => r.geometry?.location)
                    .map((r) => ({
                      id: r.place_id ?? crypto.randomUUID(),
                      name: r.name ?? 'Unknown',
                      category: type,
                      position: {
                        lat: r.geometry!.location!.lat(),
                        lng: r.geometry!.location!.lng(),
                      },
                      address: r.vicinity,
                    })),
                )
              },
            )
          })

        const [police, hospitals] = await Promise.all([search('police'), search('hospital')])
        if (!cancelled) setPlaces([...police, ...hospitals])
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load nearby places.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [center?.lat, center?.lng])

  return { places, error, loading }
}
