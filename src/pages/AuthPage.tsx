import { useState } from 'react'
import { BrandMark } from '../components/Brand'

type Mode = 'login' | 'signup'

// Something, then @, then something with a dot in it. Good enough to catch typos.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Login and signup screens. There is no real sign-in yet: we only check the
 * email and password look right, then let you in. Real accounts come in Milestone 7.
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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({})

  function validate() {
    const next: typeof errors = {}
    if (isSignup && !name.trim()) next.name = 'Tell us your name so your family knows it is you.'
    if (!email.trim()) next.email = 'Pop in your email.'
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = "That email doesn't look quite right. It should look like name@example.com."
    if (!password) next.password = 'Pop in a password.'
    else if (password.length < 8)
      next.password = `Your password needs at least 8 characters. You have ${password.length} so far.`
    return next
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) onAuthenticated()
  }

  function switchMode() {
    setMode(isSignup ? 'login' : 'signup')
    setErrors({})
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

        <form className="form" onSubmit={handleSubmit} noValidate>
          {isSignup && (
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setErrors((p) => ({ ...p, name: undefined }))
                }}
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
          )}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setErrors((p) => ({ ...p, email: undefined }))
              }}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setErrors((p) => ({ ...p, password: undefined }))
              }}
              aria-invalid={!!errors.password}
            />
            {errors.password ? (
              <p className="error">{errors.password}</p>
            ) : (
              <p className="muted">At least 8 characters.</p>
            )}
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
            onClick={switchMode}
          >
            {isSignup ? 'Log in' : 'Create an account'}
          </button>
        </p>

        <p className="auth-note">
          🔒 Accounts are coming soon. Your contacts stay on this phone for now.
        </p>
      </div>
    </div>
  )
}
