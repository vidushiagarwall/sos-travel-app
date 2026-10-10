import { Brand } from '../components/Brand'
import { IconShield, IconUsers, IconMap, IconPin } from '../components/icons'
import { HeroArt } from '../components/HeroArt'
import { IntroSplash } from '../components/IntroSplash'
import { Postcard } from '../components/Postcard'
import { PracticeSOS } from '../components/PracticeSOS'
import { PackingGame } from '../components/PackingGame'
import { useReveal } from '../hooks/useReveal'

const PLACES = ['Lisbon', 'Hanoi', 'Jaipur', 'Kyoto', 'Bali', 'Istanbul', 'Cusco', 'Marrakech', 'Seoul', 'Santorini']

export function LandingPage({
  onGetStarted,
  onLogin,
}: {
  onGetStarted: () => void
  onLogin: () => void
}) {
  useReveal()

  return (
    <div className="landing">
      <IntroSplash />

      <header className="landing-header">
        <Brand />
        <nav className="landing-nav">
          <button className="btn btn-ghost" onClick={onLogin}>
            Log in
          </button>
          <button className="btn btn-primary" onClick={onGetStarted}>
            Get started
          </button>
        </nav>
      </header>

      <section className="hero">
        <div>
          <span className="chip hero-eyebrow">For women who travel solo ✈</span>
          <h1>
            Go anywhere. <em>Someone's got your back.</em>
          </h1>
          <p className="hero-lead">
            HerWay keeps the people you trust in the loop, shows you where help is nearby, and puts
            the local emergency numbers one tap away. So you can stop worrying and actually enjoy
            the trip.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={onGetStarted}>
              Start for free
            </button>
            <button className="btn btn-ghost" onClick={onLogin}>
              I have an account
            </button>
          </div>
          <p className="hero-trust">
            <IconShield style={{ width: 18, height: 18 }} />
            Your location only goes to people you pick. Nobody else.
          </p>
        </div>
        <div className="hero-art">
          <HeroArt />
          <span className="scribble hero-scribble">your people, always close</span>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...PLACES, ...PLACES].map((p, i) => (
            <span key={i}>
              {p} <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      <section className="section reveal" id="postcard">
        <div className="section-head">
          <h2>Where are you off to?</h2>
          <p>Pick a place and flip the postcard. These are the numbers to save before you land.</p>
        </div>
        <span className="scribble postcard-scribble">go on, pick one ↓</span>
        <Postcard />
      </section>

      <section className="section reveal" id="features">
        <div className="section-head">
          <h2>What's inside</h2>
          <p>Five tools. No clutter.</p>
        </div>
        <div className="bento">
          <article className="feature feature-big">
            <h3>SOS in one tap</h3>
            <p>Your live location and a help message go straight to your people.</p>
            <PracticeSOS />
          </article>
          <Feature
            icon={<IconMap />}
            tone=""
            title="Help nearby"
            body="See the closest police stations and hospitals on a map, wherever you are."
          />
          <Feature
            icon={<IconUsers />}
            tone="lav"
            title="Your circle"
            body="Mum, your best friend, whoever picks up at 3am. Add them once."
          />
          <Feature
            icon={<IconPin />}
            tone="lav"
            title="Trip sharing"
            body="Plan a route and send it to someone before you head out."
          />
          <Feature
            icon={<IconShield />}
            tone="rose"
            title="Local numbers"
            body="Police, ambulance and fire for the country you're in. Ready before you land."
          />
        </div>
      </section>

      <section className="section reveal" id="pack">
        <div className="section-head">
          <h2>Pack your safety bag</h2>
          <p>Tap the things you'd actually take. Careful, some of these are a bad idea.</p>
        </div>
        <PackingGame />
      </section>

      <section className="section reveal">
        <div className="section-head">
          <h2>How it works</h2>
        </div>
        <div className="steps">
          <Step title="Make an account" body="Takes about a minute." />
          <Step title="Add your people" body="The ones who should hear from you if something's off." />
          <Step title="Go!" body="Share where you are, find help nearby, or hit SOS if you need to." />
        </div>
      </section>

      <section className="cta-band reveal">
        <h2>Your next trip is waiting.</h2>
        <p>Set it up now, before you need it.</p>
        <button className="btn btn-primary" onClick={onGetStarted}>
          Let's go
        </button>
      </section>

      <footer className="landing-footer">
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} HerWay. Made by Vidushi.</p>
        <p className="disclaimer" style={{ marginTop: 6 }}>
          HerWay is here to help, but it doesn't replace emergency services. If you're in danger,
          call the local emergency number.
        </p>
      </footer>
    </div>
  )
}

function Feature({
  icon,
  title,
  body,
  tone,
}: {
  icon: React.ReactNode
  title: string
  body: string
  tone: '' | 'lav' | 'rose'
}) {
  return (
    <article className="feature">
      <div className={`feature-icon ${tone}`}>{icon}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  )
}

function Step({ title, body }: { title: string; body: string }) {
  return (
    <div className="step">
      <div className="step-num" />
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  )
}
