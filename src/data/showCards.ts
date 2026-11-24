// Cards for the "Show this screen" page. Each card is shown big, one per screen,
// so a stranger, driver or police officer can read it.
//
// To add a language: add it to LANGUAGES, then add a line for it on every card.
// Please have a native speaker check every new translation before it goes live.

export const LANGUAGES = {
  hi: 'हिन्दी',
  en: 'English',
} as const

export type LanguageCode = keyof typeof LANGUAGES

export type ShowCard = {
  id: string
  emoji: string
  text: Record<LanguageCode, string>
}

export const SHOW_CARDS: ShowCard[] = [
  {
    id: 'female-officer',
    emoji: '👮‍♀️',
    text: {
      hi: 'मुझे महिला पुलिस अधिकारी चाहिए।',
      en: 'I need a female police officer.',
    },
  },
  {
    id: 'hospital',
    emoji: '🏥',
    text: {
      hi: 'कृपया मुझे अस्पताल ले चलिए।',
      en: 'Please take me to a hospital.',
    },
  },
  {
    id: 'lost',
    emoji: '🧭',
    text: {
      hi: 'मैं रास्ता भटक गई हूँ। कृपया मेरी मदद कीजिए।',
      en: 'I am lost. Please help me.',
    },
  },
  {
    id: 'call-112',
    emoji: '📞',
    text: {
      hi: 'कृपया मेरे लिए 112 पर फ़ोन कीजिए।',
      en: 'Please call 112 for me.',
    },
  },
  {
    id: 'followed',
    emoji: '⚠️',
    text: {
      hi: 'कोई मेरा पीछा कर रहा है।',
      en: 'Someone is following me.',
    },
  },
  {
    id: 'stay',
    emoji: '🤝',
    text: {
      hi: 'मैं सुरक्षित महसूस नहीं कर रही हूँ। कृपया मेरे साथ रहिए।',
      en: "I don't feel safe. Please stay with me.",
    },
  },
]
