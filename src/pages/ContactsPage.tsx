import { useRef, useState } from 'react'
import type { TrustedContact } from '../types/contact'
import { addContact, getAllContacts, removeContact, updateContact } from '../storage/contactsStore'
import { ContactListItem } from '../components/ContactListItem'
import { FamilyLinkMaker } from '../components/FamilyLinkMaker'
import { hasCountryCode } from '../sharing/shareLinks'

const COUNTRY_CODE_WARNING =
  'Add +91 (or your country code) at the start, like +91 98765 43210. WhatsApp and SMS abroad need it to reach them.'

export function ContactsPage() {
  const [contacts, setContacts] = useState<TrustedContact[]>(getAllContacts())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [relationship, setRelationship] = useState('')
  const [isPrimary, setIsPrimary] = useState(false)
  const [saved, setSaved] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  // Shows as soon as a number is typed, so the warning comes before saving, not after.
  const missingCode = phoneNumber.trim() !== '' && !hasCountryCode(phoneNumber)

  function resetForm() {
    setEditingId(null)
    setName('')
    setPhoneNumber('')
    setRelationship('')
    setIsPrimary(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phoneNumber.trim() || missingCode) return
    const data = { name: name.trim(), phoneNumber: phoneNumber.trim(), relationship: relationship.trim(), isPrimary }
    if (editingId) {
      updateContact(editingId, data)
      setSaved(`Saved changes to ${data.name}.`)
    } else {
      addContact(data)
      setSaved(`${data.name} added.`)
    }
    setContacts(getAllContacts())
    resetForm()
    setTimeout(() => setSaved(''), 2500)
  }

  function handleEdit(c: TrustedContact) {
    setEditingId(c.id)
    setName(c.name)
    setPhoneNumber(c.phoneNumber)
    setRelationship(c.relationship ?? '')
    setIsPrimary(c.isPrimary)
    setSaved('')
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleRemove(c: TrustedContact) {
    if (!window.confirm(`Delete ${c.name}? They won't get your SOS or trip messages anymore.`)) return
    removeContact(c.id)
    if (editingId === c.id) resetForm()
    setContacts(getAllContacts())
  }

  return (
    <div>
      <h1 className="page-title">Trusted Contacts</h1>
      <p className="page-sub">The people who get your SOS and trip messages. They're saved on this phone only.</p>

      <FamilyLinkMaker contacts={contacts} />

      <form ref={formRef} onSubmit={handleSubmit} className="form card">
        <strong>{editingId ? 'Edit contact' : 'Add a contact'}</strong>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input
          type="tel"
          placeholder="Phone number with country code, e.g. +91 98765 43210"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          aria-invalid={missingCode}
          required
        />
        {missingCode && <p className="error">{COUNTRY_CODE_WARNING}</p>}
        <input
          placeholder="Relationship (optional)"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
        />
        <label className="checkbox-label">
          <input type="checkbox" checked={isPrimary} onChange={(e) => setIsPrimary(e.target.checked)} />
          Primary contact
        </label>
        <div className="button-row">
          <button className="btn btn-primary" type="submit" disabled={missingCode}>
            {editingId ? 'Save changes' : 'Add contact'}
          </button>
          {editingId && (
            <button className="btn btn-ghost" type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
        {saved && <p className="muted">{saved}</p>}
      </form>

      {contacts.length === 0 ? (
        <p className="muted">No trusted contacts yet. Add at least one before using SOS.</p>
      ) : (
        <>
          <p className="muted">
            {contacts.length} {contacts.length === 1 ? 'person' : 'people'} saved.
          </p>
          <ul className="list">
            {contacts.map((c) => (
              <ContactListItem
                key={c.id}
                contact={c}
                isEditing={c.id === editingId}
                onEdit={() => handleEdit(c)}
                onRemove={() => handleRemove(c)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
