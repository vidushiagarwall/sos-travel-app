import { describe, expect, it } from 'vitest'
import { buildMailtoLink, buildSmsLink, buildWhatsAppLink, hasCountryCode } from './shareLinks'

const message = 'I need help! My location: https://maps.google.com/?q=21.03,105.85 & call me'

describe('hasCountryCode', () => {
  it('accepts numbers that start with + or 00', () => {
    expect(hasCountryCode('+91 98765 43210')).toBe(true)
    expect(hasCountryCode('+919876543210')).toBe(true)
    expect(hasCountryCode('0091 98765 43210')).toBe(true)
    expect(hasCountryCode('  +84 912 345 678  ')).toBe(true)
  })

  it('rejects numbers with no country code', () => {
    expect(hasCountryCode('98765 43210')).toBe(false)
    expect(hasCountryCode('09876543210')).toBe(false)
  })

  it('rejects numbers that are too short', () => {
    expect(hasCountryCode('+91')).toBe(false)
    expect(hasCountryCode('+91 123')).toBe(false)
  })
})

describe('buildWhatsAppLink', () => {
  it('opens a chat with that person, using digits only', () => {
    const link = buildWhatsAppLink(message, '+91 98765-43210')
    expect(link.startsWith('https://wa.me/919876543210?text=')).toBe(true)
  })

  it('keeps the whole message, including & and links', () => {
    const link = buildWhatsAppLink(message, '+919876543210')
    const text = new URL(link).searchParams.get('text')
    expect(text).toBe(message)
  })

  it('without a number, lets you pick the chat in WhatsApp', () => {
    expect(buildWhatsAppLink('hi').startsWith('https://wa.me/?text=')).toBe(true)
  })
})

describe('buildSmsLink', () => {
  it('sends to one person', () => {
    expect(buildSmsLink(['+919876543210'], 'hi')).toBe('sms:+919876543210?body=hi')
  })

  it('sends to everyone ticked, separated by commas', () => {
    const link = buildSmsLink(['+919876543210', '+919123456789'], 'hi')
    expect(link).toBe('sms:+919876543210,+919123456789?body=hi')
  })

  it('encodes the message so & and spaces do not break it', () => {
    const link = buildSmsLink(['+919876543210'], message)
    expect(decodeURIComponent(link.split('?body=')[1])).toBe(message)
    expect(link).not.toContain(' ')
  })
})

describe('buildMailtoLink', () => {
  it('puts the subject and message in the email', () => {
    const link = buildMailtoLink('Hello & bye', 'My trip')
    expect(link).toBe('mailto:?subject=My%20trip&body=Hello%20%26%20bye')
  })
})
