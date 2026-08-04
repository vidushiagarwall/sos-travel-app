import type { LatLng } from '../types/trip'

export function buildLocationLink(position: LatLng): string {
  return `https://maps.google.com/?q=${position.lat},${position.lng}`
}

export function buildSosMessage(position: LatLng, name?: string): string {
  const who = name ? `${name} needs` : 'I need'
  return `SOS - ${who} help. My current location: ${buildLocationLink(position)}`
}

export function buildTripShareMessage(
  tripTitle: string,
  originText: string,
  destinationText: string,
  directionsUrl: string,
): string {
  return `Sharing my trip "${tripTitle}": ${originText} -> ${destinationText}. Route: ${directionsUrl}`
}

export function buildDirectionsUrl(origin: LatLng, destination: LatLng): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}`
}
