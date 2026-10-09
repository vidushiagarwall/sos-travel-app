import { Brand } from '../components/Brand'
import {
  IconShield,
  IconUsers,
  IconMap,
  IconBell,
  IconPin,
  IconHeart,
} from '../components/icons'
import { HeroArt } from '../components/HeroArt'

export function LandingPage({
  onGetStarted,
  onLogin,
}: {
  onGetStarted: () => void
  onLogin: () => void
}) {
  return (
    <div className="landing">
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

      {/* Hero */}
      <section className="hero">
        <div>
          <span className="chip hero-eyebrow">
            <IconHeart style={{ width: 16, height: 16 }} /> Built for women, by design
          </span>
          <h1>
            Travel the world, <em>feeling safe</em> every step of the way.
          </h1>
          <p className="hero-lead">
            HerWay is a safety companion for women travellers. Share your location with people you
            trust, find help nearby, and reach emergency services instantly — all from one calm,
            reassuring place.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={onGetStarted}>
              Get started — it's free
            </button>
            <button className="btn btn-ghost" onClick={onLogin}>
              I already have an account
            </button>
          </div>
          <p className="hero-trust">
            <IconShield style={{ width: 18, height: 18 }} />
            Your location is only ever shared with people you choose.
          </p>
        </div>
        <div className="hero-art">
          <HeroArt />
        </div>
      </section>

      {/* Features */}
      <section className="section" id="features">
        <div className="section-head">
          <h2>Everything you need to feel confident on the road</h2>
          <p>Thoughtful tools that work quietly in the background — until the moment you need them.</p>
        </div>
        <div className="features">
          <Feature
            icon={<IconBell />}
            tone=""
            title="One-tap SOS"
            body="Send your live location and a help message to your trusted contacts in a single tap."
          />
          <Feature
            icon={<IconMap />}
            tone=""
            title="Safety map"
            body="Instantly see the nearest police stations, hospitals and safe places around you."
          />
          <Feature
            icon={<IconUsers />}
            tone="lav"
            title="Trusted circle"
            body="Add the people who look out for you and let them follow your journey in real time."
          />
          <Feature
            icon={<IconPin />}
            tone="lav"
            title="Trip planner"
            body="Map out your routes and stays, and share your itinerary with someone you trust."
          />
          <Feature
            icon={<IconShield />}
            tone="rose"
            title="Local safety info"
            body="Country emergency numbers and nearby embassies, ready before you even land."
          />
          <Feature
            icon={<IconHeart />}
            tone="rose"
            title="Calm by design"
            body="A gentle, clutter-free experience made to reassure — not to alarm."
          />
        </div>
      </section>

      {/* How it works */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Peace of mind in three steps</h2>
          <p>Set it up once, then travel with someone always looking out for you.</p>
        </div>
        <div className="steps">
          <Step title="Create your account" body="Sign up securely in under a minute — no fuss." />
          <Step
            title="Add your trusted circle"
            body="Choose the friends and family who should be able to reach you."
          />
          <Step
            title="Travel with confidence"
            body="Share your location, find help nearby, and SOS in one tap."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <h2>Ready to travel safer?</h2>
        <p>Join women exploring the world with a trusted companion in their pocket.</p>
        <button className="btn btn-primary" onClick={onGetStarted}>
          Get started for free
        </button>
      </section>

      <footer className="landing-footer">
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} HerWay · A safety companion for women travellers.
        </p>
        <p className="disclaimer" style={{ marginTop: 6 }}>
          HerWay is a safety aid and does not replace emergency services. In an emergency, always
          contact local authorities.
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
