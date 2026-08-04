import type { SavedTrip } from '../types/trip'

const STORAGE_KEY = 'sos_app_trips'

function readAll(): SavedTrip[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as SavedTrip[]
  } catch {
    return []
  }
}

function writeAll(trips: SavedTrip[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips))
}

export function getAllTrips(): SavedTrip[] {
  return readAll()
}

export function addTrip(trip: Omit<SavedTrip, 'id' | 'createdAt'>): SavedTrip {
  const newTrip: SavedTrip = {
    ...trip,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  }
  const trips = readAll()
  trips.push(newTrip)
  writeAll(trips)
  return newTrip
}

export function removeTrip(id: string) {
  writeAll(readAll().filter((t) => t.id !== id))
}
