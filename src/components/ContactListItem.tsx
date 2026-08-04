import type { TrustedContact } from '../types/contact'

export function ContactListItem({
  contact,
  onRemove,
}: {
  contact: TrustedContact
  onRemove: (id: string) => void
}) {
  return (
    <li className="contact-item">
      <div>
        <strong>{contact.name}</strong> {contact.isPrimary && <span className="badge">Primary</span>}
        <div className="muted">{contact.phoneNumber}</div>
        {contact.relationship && <div className="muted">{contact.relationship}</div>}
      </div>
      <button className="link-button" onClick={() => onRemove(contact.id)}>
        Remove
      </button>
    </li>
  )
}
