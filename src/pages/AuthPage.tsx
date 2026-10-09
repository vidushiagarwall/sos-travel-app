import { useState } from 'react'
import { BrandMark } from '../components/Brand'

type Mode = 'login' | 'signup'

/**
 * Auth UI. This is the visual/UX layer only — it does not yet perform real
 * authentication. Wiring to a secure backend (e.g. email+password / OAuth) is a
 * later milestone; for now "continue" simply enters the app.
 */
export function AuthPage({
  initialMode = 'login',
  onAuthenticated,
  onBack,
}: {
  initialMode?: Mode
  onAuthenticated: () => void
  onBack: () => void
}) {
  const [mode, setMode] = useState<Mode>(initialMode)
  const isSignup = mode === 'signup'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onAuthenticated()
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-head">
          <button className="brand" type="button" onClick={onBack} aria-label="Back to home">
            <BrandMark />
          </button>
          <h1>{isSignup ? 'Create your account' : 'Welcome back'}</h1>
          <p>
            {isSignup
              ? 'Set up your safety companion in under a minute.'
              : 'Log in to continue travelling safely.'}
          </p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" type="text" placeholder="Your name" autoComplete="name" required />
            </div>
          )}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              required
            />
          </div>

          {isSignup && (
            <label className="checkbox-label">
              <input type="checkbox" required /> I agree to travel safely and to the terms.
            </label>
          )}

          <button className="btn btn-primary btn-block" type="submit">
            {isSignup ? 'Create account' : 'Log in'}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? 'Already have an account?' : 'New to HerWay?'}{' '}
          <button
            className="link-button"
            type="button"
            onClick={() => setMode(isSignup ? 'login' : 'signup')}
          >
            {isSignup ? 'Log in' : 'Create an account'}
          </button>
        </p>

        <p className="auth-note">
          🔒 Secure sign-in is coming soon. For this preview, continue to explore the app.
        </p>
      </div>
    </div>
  )
}
