import { findDestination, MEA_NUMBERS, MADAD, type FamilyNumber, type FamilySource } from '../data/familyPlan'
import { dialable, type FamilyInfo } from '../sharing/familyLink'

function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function Source({ source }: { source: FamilySource }) {
  return (
    <p className="family-source">
      Source:{' '}
      <a href={source.url} target="_blank" rel="noreferrer">
        {source.name}
      </a>
    </p>
  )
}

function OfficialNumber({ n }: { n: FamilyNumber }) {
  return (
    <div className="family-number">
      <a className="btn btn-primary family-call" href={`tel:${n.dial}`}>
        Call {n.number}
      </a>
      {n.whatsapp && (
        <a className="btn btn-ghost family-call" href={`https://wa.me/${n.whatsapp}`} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      )}
      <p className="family-label">{n.label}</p>
      <Source source={n.source} />
    </div>
  )
}

function Step({ num, title, wait, children }: { num: number; title: string; wait: string; children: React.ReactNode }) {
  return (
    <section className="family-step">
      <div className="family-step-head">
        <span className="family-num" aria-hidden="true">
          {num}
        </span>
        <div>
          <span className="family-wait">{wait}</span>
          <h2>
            <span className="sr-only">Step {num}: </span>
            {title}
          </h2>
        </div>
      </div>
      <div className="family-step-body">{children}</div>
    </section>
  )
}

export function FamilyPage({ info }: { info: FamilyInfo | 'broken' }) {
  if (info === 'broken') {
    return (
      <div className="family-page">
        <h1>This link didn't open properly</h1>
        <p>Part of the link may be missing. Ask her to send it again, or copy the whole link into your browser.</p>
      </div>
    )
  }

  const dest = findDestination(info.dest)
  const herDial = dialable(info.phone)
  const hotelDial = dialable(info.hotelPhone)
  const made = formatDate(info.made)

  return (
    <div className="family-page">
      <p className="family-brand">HerWay</p>
      <h1>If you cannot reach {info.name}</h1>
      <p className="family-lead">
        {info.name} is travelling in {dest ? `${dest.city}, ${dest.country}` : 'another country'}
        {made ? `. She made this page on ${made}` : ''}.
      </p>

      <div className="family-calm">
        <p>
          <strong>Most of the time, no reply just means a dead battery or no signal.</strong> Stay calm
          and work down this list in order.
        </p>
        <p>
          The wait times are HerWay's suggestion, not official advice.{' '}
          <strong>If you think she is in danger, go straight to step 3.</strong>
        </p>
      </div>

      <Step num={1} title={`Call or message ${info.name}`} wait="Right away">
        <p>Try calling and WhatsApp a few times over the next 2 hours. Her internet may be patchy.</p>
        {herDial ? (
          <div className="family-number">
            <a className="btn btn-primary family-call" href={`tel:${herDial}`}>
              Call {info.phone}
            </a>
            <a
              className="btn btn-ghost family-call"
              href={`https://wa.me/${herDial.replace('+', '')}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        ) : (
          <p className="muted">She didn't add her phone number.</p>
        )}
      </Step>

      <Step num={2} title="Call her hotel" wait="After 2 hours with no reply">
        <p>
          <strong>{info.hotel || 'Hotel name not added'}</strong>
          {info.hotelAddress && (
            <>
              <br />
              {info.hotelAddress}
            </>
          )}
        </p>
        <p>Ask reception if she has come back, and ask them to knock on her room.</p>
        {hotelDial ? (
          <div className="family-number">
            <a className="btn btn-primary family-call" href={`tel:${hotelDial}`}>
              Call {info.hotelPhone}
            </a>
          </div>
        ) : (
          <p className="muted">She didn't add the hotel's phone number.</p>
        )}
      </Step>

      {dest ? (
        <>
          <Step num={3} title={`Contact the ${dest.embassy.name}`} wait="After 6 hours, or now if she may be in danger">
            <p>{dest.embassy.address}</p>
            <p>
              Have ready: her full name, passport number if you have it, her hotel, and when you last
              heard from her.
            </p>
            {dest.embassy.numbers.map((n) => (
              <OfficialNumber key={n.dial} n={n} />
            ))}
          </Step>

          <Step num={4} title="Report it to the local police" wait="At the same time as step 3">
            <p>{dest.police.note}</p>
            <Source source={dest.police.source} />
          </Step>
        </>
      ) : (
        <Step num={3} title="Contact the Indian Embassy" wait="After 6 hours, or now if she may be in danger">
          <p>We don't have embassy details for this place yet. Call the Ministry of External Affairs below.</p>
        </Step>
      )}

      <Step num={dest ? 5 : 4} title="Call India's Ministry of External Affairs" wait="If the embassy hasn't helped within 12 hours">
        {MEA_NUMBERS.map((n) => (
          <OfficialNumber key={n.dial} n={n} />
        ))}
        <p>
          You can also raise a request online on{' '}
          <a href={MADAD.url} target="_blank" rel="noreferrer">
            {MADAD.name}
          </a>
          .
        </p>
      </Step>

      <p className="disclaimer">
        {dest && `Official numbers last checked ${formatDate(dest.lastChecked)}. `}
        HerWay doesn't replace emergency services. Her details live only inside this link. Nothing is
        saved on a server.
      </p>
    </div>
  )
}
