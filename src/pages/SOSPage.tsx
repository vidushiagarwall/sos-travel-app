import { useState } from 'react'
import { useCurrentLocation } from '../location/useCurrentLocation'
import { getAllContacts } from '../storage/contactsStore'
import { buildSosMessage } from '../sharing/sosMessage'
import { buildSmsLink, buildWhatsAppLink, copyToClipboard } from '../sharing/shareLinks'
import { SOSButton } from '../components/SOSButton'

export function SOSPage() {
  const { position, error: locationError, loading: locationLoading } = useCurrentLocation()
  const contacts = getAllContacts()
  const [triggered, setTriggered] = useState(false)
  const [copied, setCopied] = useState(false)

  const message = position ? buildSosMessage(position) : null
  const phoneNumbers = contacts.map((c) => c.phoneNumber)

  async function handleCopy() {
    if (!message) return
    const ok = await copyToClipboard(message)
    setCopied(ok)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <h1 className="page-title">Emergency SOS</h1>
      <p className="page-sub">One tap alerts your trusted circle with your live location.</p>
      {contacts.length === 0 && (
        <p className="error">Add at least one trusted contact before using SOS.</p>
      )}
      {locationLoading && <p className="muted">Getting your location…</p>}
      {locationError && <p className="error">{locationError}</p>}

      <div className="sos-center">
        <SOSButton onClick={() => setTriggered(true)} disabled={!position || contacts.length === 0} />
      </div>
      <p className="sos-hint">Tap when you feel unsafe — you'll confirm before anything sends.</p>

      {triggered && message && (
        <div className="sos-panel">
          <p>Your message is ready. This is one-tap-to-send — tapping a link below opens your messaging app with everything pre-filled, you still confirm sending there.</p>
          <p className="message-preview">{message}</p>
          <div className="button-row">
            <a className="btn btn-danger" href={buildSmsLink(phoneNumbers, message)}>
              Send via SMS
            </a>
            <a
              className="btn btn-primary"
              href={buildWhatsAppLink(message, phoneNumbers[0])}
              target="_blank"
              rel="noreferrer"
            >
              Send via WhatsApp
            </a>
            <button className="btn btn-ghost" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy message'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
