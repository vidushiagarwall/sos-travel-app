import { useState } from 'react'
import { buildSmsLink, buildWhatsAppLink, hasCountryCode } from '../sharing/shareLinks'
import type { TrustedContact } from '../types/contact'

// Shows every saved contact with a tick box (all ticked to start).
// Each ticked person gets their own WhatsApp and SMS buttons, because a
// wa.me link can only open one chat at a time. SMS can go to everyone at once.
export function ContactSendList({ contacts, message }: { contacts: TrustedContact[]; message: string }) {
  const [unticked, setUnticked] = useState<Set<string>>(new Set())

  if (contacts.length === 0) return null

  const ticked = contacts.filter((c) => !unticked.has(c.id))

  function toggle(id: string) {
    setUnticked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="contact-send">
      <h3 className="family-send-title">
        Send to {ticked.length} of {contacts.length} {contacts.length === 1 ? 'person' : 'people'}:
      </h3>
      <ul className="family-send-list">
        {contacts.map((c) => {
          const on = !unticked.has(c.id)
          return (
            <li key={c.id}>
              <label className="contact-send-pick">
                <input type="checkbox" checked={on} onChange={() => toggle(c.id)} />
                <span className="family-send-name">
                  {c.name}
                  {c.relationship ? <span className="muted"> ({c.relationship})</span> : null}
                  {on && !hasCountryCode(c.phoneNumber) && (
                    <span className="family-send-warn">
                      No country code on this number, so WhatsApp may not find them.
                    </span>
                  )}
                </span>
              </label>
              {on && (
                <span className="family-send-buttons">
                  <a
                    className="btn btn-primary"
                    href={buildWhatsAppLink(message, c.phoneNumber)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                  <a className="btn btn-ghost" href={buildSmsLink([c.phoneNumber], message)}>
                    SMS
                  </a>
                </span>
              )}
            </li>
          )
        })}
      </ul>
      {ticked.length > 0 && (
        <a
          className="btn btn-danger btn-block contact-send-all"
          href={buildSmsLink(
            ticked.map((c) => c.phoneNumber),
            message,
          )}
        >
          SMS everyone ticked ({ticked.length})
        </a>
      )}
      {ticked.length === 0 && <p className="muted">Tick at least one person to send this.</p>}
    </div>
  )
}
