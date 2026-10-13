import { useState } from 'react'

// The Must have list from Milestone 1. Keep this in sync with docs/research/must-haves.md
const COMING = [
  {
    icon: '🧭',
    name: 'Country safety guide',
    text: "Type where you're going and get one page for that country. Emergency numbers, women's helplines, the nearest Indian embassy, common scams and safety tips, all in one place.",
  },
  {
    icon: '📞',
    name: 'Emergency numbers everywhere',
    text: "The right numbers for every country. Tap one to call it, and they still work when you're offline.",
  },
  {
    icon: '🆘',
    name: 'SOS message',
    text: 'One tap sends your live location to your emergency contacts.',
  },
  {
    icon: '📴',
    name: 'Offline mode',
    text: 'Key emergency phrases and maps saved on your phone, for places where the signal or wifi is patchy.',
  },
  {
    icon: '🔐',
    name: 'Your own login',
    text: 'Sign in to your own account so your details are saved and waiting for you every time you come back.',
  },
  {
    icon: '👭',
    name: 'Your emergency contacts',
    text: 'Save the people who matter in your account. If something feels wrong, you can let them know straight away.',
  },
  {
    icon: '⏱️',
    name: 'Check in timer',
    text: "Pick a time to check in by. If you don't, HerWay lets your emergency contact know.",
  },
  {
    icon: '🏡',
    name: 'Guide for family back home',
    text: "When you share your trip, your family gets a page on what to do if they can't reach you. Local emergency numbers, the embassy and your hotel details.",
  },
  {
    icon: '✈️',
    name: 'Your first hour after landing',
    text: 'Getting from the airport to your hotel safely. Where the official taxi counters are, which ride apps actually work there, SIM tips and what to save offline.',
  },
  {
    icon: '🪧',
    name: '"Show this screen" cards',
    text: 'Big phrase cards in the local language that you can hold up to anyone. Like "I am being followed" or "Take me to the nearest police station". They work offline too.',
  },
  {
    icon: '📍',
    name: 'Local tips where you are',
    text: "Heads up on dress norms, common scams and tourist traps, based on where you're standing right now.",
  },
  {
    icon: '🗺️',
    name: 'Safe places map',
    text: 'The nearest hospital, police station and pharmacy around you, all on one map.',
  },
  {
    icon: '📊',
    name: 'Safety score',
    text: "One score for each place, built from travel advisories, crime data and things like street lighting. We'll show exactly how it's worked out.",
  },
  {
    icon: '🎚️',
    name: 'Your own risk profile',
    text: "Tell us the time of day, your budget and whether you're solo or with a guide, and your safety score changes to fit you.",
  },
]

export function WhatsComing() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="coming-grid">
      {COMING.map((f, i) => {
        const isOpen = open === i
        return (
          <button
            key={f.name}
            type="button"
            className={isOpen ? 'coming-card open' : 'coming-card'}
            onClick={() => setOpen(isOpen ? null : i)}
            aria-expanded={isOpen}
          >
            <span className="coming-top">
              <span className="coming-icon">{f.icon}</span>
              <span className="coming-num">{String(i + 1).padStart(2, '0')}</span>
            </span>
            <span className="coming-name">{f.name}</span>
            <span className="coming-body">
              <span className="coming-text">{f.text}</span>
            </span>
            <span className="coming-more">{isOpen ? 'Show less' : 'What does it do?'}</span>
          </button>
        )
      })}
    </div>
  )
}
