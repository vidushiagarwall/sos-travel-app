export type LatLng = {
  lat: number
  lng: number
}

export type SavedTrip = {
  id: string
  title: string
  originText: string
  originCoords: LatLng
  destinationText: string
  destinationCoords: LatLng
  encodedPolyline?: string
  startTime?: string
  notes?: string
  createdAt: string
}
