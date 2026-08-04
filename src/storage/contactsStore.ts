import type { TrustedContact } from '../types/contact'

const STORAGE_KEY = 'sos_app_contacts'

function readAll(): TrustedContact[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as TrustedContact[]
  } catch {
    return []
  }
}

function writeAll(contacts: TrustedContact[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
}

export function getAllContacts(): TrustedContact[] {
  return readAll()
}

export function addContact(contact: Omit<TrustedContact, 'id'>): TrustedContact {
  const newContact: TrustedContact = { ...contact, id: crypto.randomUUID() }
  const contacts = readAll()
  contacts.push(newContact)
  writeAll(contacts)
  return newContact
}

export function updateContact(id: string, updates: Partial<Omit<TrustedContact, 'id'>>) {
  const contacts = readAll().map((c) => (c.id === id ? { ...c, ...updates } : c))
  writeAll(contacts)
}

export function removeContact(id: string) {
  writeAll(readAll().filter((c) => c.id !== id))
}
