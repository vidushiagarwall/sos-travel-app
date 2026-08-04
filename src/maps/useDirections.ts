import { useState } from 'react'
import { loadGoogleMaps } from './loadGoogleMaps'
import type { LatLng } from '../types/trip'

export type DirectionsResult = {
  encodedPolyline: string
  distanceText?: string
  durationText?: string
  rawResult: google.maps.DirectionsResult
}

export function useDirections() {
  const [result, setResult] = useState<DirectionsResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function getRoute(origin: LatLng, destination: LatLng) {
    setLoading(true)
    setError(null)
    try {
      const google = await loadGoogleMaps()
      const service = new google.maps.DirectionsService()
      const response = await service.route({
        origin: origin as google.maps.LatLngLiteral,
        destination: destination as google.maps.LatLngLiteral,
        travelMode: google.maps.TravelMode.WALKING,
      })

      const leg = response.routes[0]?.legs[0]
      const directionsResult: DirectionsResult = {
        encodedPolyline: response.routes[0]?.overview_polyline ?? '',
        distanceText: leg?.distance?.text,
        durationText: leg?.duration?.text,
        rawResult: response,
      }
      setResult(directionsResult)
      return directionsResult
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to get directions.'
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { getRoute, result, error, loading }
}
