import { useState } from 'react'
import type { TrustedContact } from '../types/contact'
import { addContact, getAllContacts, removeContact } from '../storage/contactsStore'
import { ContactListItem } from '../components/ContactListItem'

export function ContactsPage() {
  const [contacts, setContacts] = useState<TrustedContact[]>(getAllContacts())
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [relationship, setRelationship] = useState('')
  const [isPrimary, setIsPrimary] = useState(false)

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !phoneNumber.trim()) return
    addContact({ name: name.trim(), phoneNumber: phoneNumber.trim(), relationship: relationship.trim(), isPrimary })
    setContacts(getAllContacts())
    setName('')
    setPhoneNumber('')
    setRelationship('')
    setIsPrimary(false)
  }

  function handleRemove(id: string) {
    removeContact(id)
    setContacts(getAllContacts())
  }

  return (
    <div>
      <h1 className="page-title">Trusted Contacts</h1>
      <p className="page-sub">The people who receive your SOS and trip-sharing messages.</p>

      <form onSubmit={handleAdd} className="form card">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input
          placeholder="Phone number (e.g. +1 555 123 4567)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          placeholder="Relationship (optional)"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
        />
        <label className="checkbox-label">
          <input type="checkbox" checked={isPrimary} onChange={(e) => setIsPrimary(e.target.checked)} />
          Primary contact
        </label>
        <button className="btn btn-primary" type="submit">Add contact</button>
      </form>

      {contacts.length === 0 ? (
        <p className="muted">No trusted contacts yet. Add at least one before using SOS.</p>
      ) : (
        <ul className="list">
          {contacts.map((c) => (
            <ContactListItem key={c.id} contact={c} onRemove={handleRemove} />
          ))}
        </ul>
      )}
    </div>
  )
}
