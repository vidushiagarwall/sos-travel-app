import { setOptions, importLibrary } from '@googlemaps/js-api-loader'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined

let optionsSet = false
let loadPromise: Promise<typeof google> | null = null

export function loadGoogleMaps(): Promise<typeof google> {
  if (!apiKey) {
    return Promise.reject(
      new Error('Missing VITE_GOOGLE_MAPS_API_KEY. Add it to your .env file (see .env.example).'),
    )
  }
  if (!optionsSet) {
    setOptions({ key: apiKey, v: 'weekly' })
    optionsSet = true
  }
  if (!loadPromise) {
    loadPromise = Promise.all([
      importLibrary('maps'),
      importLibrary('places'),
      importLibrary('geocoding'),
      importLibrary('marker'),
    ]).then(() => google)
  }
  return loadPromise
}
