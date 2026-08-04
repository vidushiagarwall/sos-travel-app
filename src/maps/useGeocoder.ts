import { useEffect, useState } from 'react'
import { loadGoogleMaps } from './loadGoogleMaps'
import type { LatLng } from '../types/trip'

type CountryInfo = {
  countryCode: string
  countryName: string
}

export function useCountryFromLocation(position: LatLng | null) {
  const [country, setCountry] = useState<CountryInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!position) return
    let cancelled = false

    async function run() {
      setLoading(true)
      setError(null)
      try {
        const google = await loadGoogleMaps()
        const geocoder = new google.maps.Geocoder()
        const response = await geocoder.geocode({ location: position as google.maps.LatLngLiteral })
        const countryComponent = response.results
          .flatMap((r: google.maps.GeocoderResult) => r.address_components)
          .find((c: google.maps.GeocoderAddressComponent) => c.types.includes('country'))

        if (countryComponent && !cancelled) {
          setCountry({ countryCode: countryComponent.short_name, countryName: countryComponent.long_name })
        } else if (!cancelled) {
          setError('Could not detect country for this location.')
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to detect country.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [position?.lat, position?.lng])

  return { country, error, loading }
}
