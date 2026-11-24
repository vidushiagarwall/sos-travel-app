// Packs the traveller's details into the link itself (after the #).
// The part after # is never sent to any server, so nothing is stored anywhere.

export type FamilyInfo = {
  name: string
  phone: string
  hotel: string
  hotelPhone: string
  hotelAddress: string
  dest: string // destination code, see data/familyPlan.ts
  made: string // YYYY-MM-DD, when she made the link
}

const PREFIX = '#family='
const MAX = 120 // longest allowed value for any field

function toBase64Url(text: string) {
  const bytes = new TextEncoder().encode(text)
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(text: string) {
  const b64 = text.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(b64)
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)))
}

export function makeFamilyLink(info: FamilyInfo) {
  const base = window.location.origin + window.location.pathname
  return base + PREFIX + toBase64Url(JSON.stringify(info))
}

export function readFamilyLink(hash: string): FamilyInfo | null | 'broken' {
  if (!hash.startsWith(PREFIX)) return null
  try {
    const raw = JSON.parse(fromBase64Url(hash.slice(PREFIX.length)))
    const field = (k: string) => (typeof raw[k] === 'string' ? raw[k].slice(0, MAX) : '')
    const info: FamilyInfo = {
      name: field('name'),
      phone: field('phone'),
      hotel: field('hotel'),
      hotelPhone: field('hotelPhone'),
      hotelAddress: field('hotelAddress'),
      dest: field('dest'),
      made: field('made'),
    }
    return info.name ? info : 'broken'
  } catch {
    return 'broken'
  }
}

// Keeps only digits and a leading +, safe to put in a tel: link
export function dialable(phone: string) {
  const trimmed = phone.trim()
  return (trimmed.startsWith('+') ? '+' : '') + trimmed.replace(/\D/g, '')
}
