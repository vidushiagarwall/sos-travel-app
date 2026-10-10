import { useCurrentLocation } from '../location/useCurrentLocation'
import { useCountryFromLocation } from '../maps/useGeocoder'
import emergencyNumbers from '../data/emergencyNumbers.json'
import type { EmergencyNumberEntry } from '../types/emergency'

const numbers = emergencyNumbers as EmergencyNumberEntry[]

export function SafetyInfoPage() {
  const { position, loading: locationLoading, error: locationError } = useCurrentLocation()
  const { country, loading: countryLoading, error: countryError } = useCountryFromLocation(position)

  const entry = country ? numbers.find((n) => n.countryCode === country.countryCode) : undefined

  return (
    <div>
      <h1 className="page-title">Local Safety Info</h1>
      <p className="page-sub">Emergency numbers and embassies for wherever you are.</p>
      {locationLoading && <p className="muted">Getting your location…</p>}
      {locationError && <p className="error">{locationError}</p>}
      {countryLoading && <p className="muted">Detecting your country…</p>}
      {countryError && <p className="error">{countryError}</p>}

      {country && (
        <p>
          You appear to be in <strong>{country.countryName}</strong>.
        </p>
      )}

      {entry ? (
        <div className="emergency-numbers">
          <div>
            <span className="muted">Police</span>
            <strong>{entry.police}</strong>
          </div>
          <div>
            <span className="muted">Ambulance</span>
            <strong>{entry.ambulance}</strong>
          </div>
          <div>
            <span className="muted">Fire</span>
            <strong>{entry.fire}</strong>
          </div>
          {entry.general && (
            <div>
              <span className="muted">General emergency</span>
              <strong>{entry.general}</strong>
            </div>
          )}
        </div>
      ) : (
        country && <p className="muted">No bundled emergency number for this country yet.</p>
      )}

      <p className="disclaimer">
        These numbers come from our starter list and can change. Double check with an official source when you can.
      </p>

      <h2>Embassy / Consulate</h2>
      <p className="muted">
        We don't have a curated embassy directory yet. Search for your home country's embassy or consulate
        {country ? ` in ${country.countryName}` : ''}:
      </p>
      <a
        className="btn btn-primary"
        href={`https://www.google.com/search?q=embassy+in+${encodeURIComponent(country?.countryName ?? '')}`}
        target="_blank"
        rel="noreferrer"
      >
        Search embassies
      </a>
    </div>
  )
}
