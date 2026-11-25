import { useState } from 'react'
import { useCurrentLocation } from '../location/useCurrentLocation'
import { getAllContacts } from '../storage/contactsStore'
import { buildSosMessage } from '../sharing/sosMessage'
import { copyToClipboard } from '../sharing/shareLinks'
import { SOSButton } from '../components/SOSButton'
import { ContactSendList } from '../components/ContactSendList'

export function SOSPage() {
  const { position, error: locationError, loading: locationLoading } = useCurrentLocation()
  const contacts = getAllContacts()
  const [triggered, setTriggered] = useState(false)
  const [copied, setCopied] = useState(false)

  const message = position ? buildSosMessage(position) : null

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
      <p className="sos-hint">Tap if you feel unsafe. You'll confirm before anything gets sent.</p>

      {triggered && message && (
        <div className="sos-panel">
          <p>Your message is ready. Untick anyone you don't want to send it to, then tap WhatsApp or SMS next to each person. The app opens with everything filled in. You just hit send.</p>
          <p className="message-preview">{message}</p>
          <ContactSendList contacts={contacts} message={message} />
          <div className="button-row">
            <button className="btn btn-ghost" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy message'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
