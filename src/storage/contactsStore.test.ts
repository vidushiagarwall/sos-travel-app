import { beforeEach, describe, expect, it } from 'vitest'
import { addContact, getAllContacts, removeContact, updateContact } from './contactsStore'

const mum = { name: 'Mum', phoneNumber: '+91 98765 43210', relationship: 'Mother', isPrimary: true }
const riya = { name: 'Riya', phoneNumber: '+91 91234 56789', relationship: 'Friend', isPrimary: false }

describe('contactsStore', () => {
  beforeEach(() => localStorage.clear())

  it('starts empty', () => {
    expect(getAllContacts()).toEqual([])
  })

  it('adds contacts and gives each one its own id', () => {
    const a = addContact(mum)
    const b = addContact(riya)
    expect(a.id).toBeTruthy()
    expect(a.id).not.toBe(b.id)
    expect(getAllContacts().map((c) => c.name)).toEqual(['Mum', 'Riya'])
  })

  it('keeps contacts after a "refresh" (they are in localStorage)', () => {
    addContact(mum)
    const raw = localStorage.getItem('sos_app_contacts')
    expect(JSON.parse(raw!)[0].phoneNumber).toBe('+91 98765 43210')
  })

  it('edits only the contact you picked', () => {
    const a = addContact(mum)
    addContact(riya)
    updateContact(a.id, { phoneNumber: '+91 90000 00000' })
    const [first, second] = getAllContacts()
    expect(first.phoneNumber).toBe('+91 90000 00000')
    expect(first.name).toBe('Mum')
    expect(second.phoneNumber).toBe(riya.phoneNumber)
  })

  it('deletes only the contact you picked', () => {
    const a = addContact(mum)
    addContact(riya)
    removeContact(a.id)
    expect(getAllContacts().map((c) => c.name)).toEqual(['Riya'])
  })

  it('does not crash if the saved data is broken', () => {
    localStorage.setItem('sos_app_contacts', 'not json{')
    expect(getAllContacts()).toEqual([])
  })
})
