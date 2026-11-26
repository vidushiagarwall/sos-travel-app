import type { TrustedContact } from '../types/contact'
import { hasCountryCode } from '../sharing/shareLinks'

export function ContactListItem({
  contact,
  isEditing,
  onEdit,
  onRemove,
}: {
  contact: TrustedContact
  isEditing: boolean
  onEdit: () => void
  onRemove: () => void
}) {
  return (
    <li className="contact-item">
      <div>
        <strong>{contact.name}</strong> {contact.isPrimary && <span className="badge">Primary</span>}
        {isEditing && <span className="badge">Editing</span>}
        <div className="muted">{contact.phoneNumber}</div>
        {contact.relationship && <div className="muted">{contact.relationship}</div>}
        {!hasCountryCode(contact.phoneNumber) && (
          <div className="error">No country code. Tap Edit and add +91.</div>
        )}
      </div>
      <div className="contact-actions">
        <button className="link-button" onClick={onEdit}>
          Edit
        </button>
        <button className="link-button" onClick={onRemove}>
          Delete
        </button>
      </div>
    </li>
  )
}
