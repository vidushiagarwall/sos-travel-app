import { useEffect, useState } from 'react'
import type { LatLng } from '../types/trip'

type LocationState = {
  position: LatLng | null
  error: string | null
  loading: boolean
}

export function useCurrentLocation() {
  const [state, setState] = useState<LocationState>({
    position: null,
    error: null,
    loading: true,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ position: null, error: 'Geolocation is not supported by this browser.', loading: false })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          error: null,
          loading: false,
        })
      },
      (err) => {
        setState({ position: null, error: err.message, loading: false })
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }, [])

  return state
}
