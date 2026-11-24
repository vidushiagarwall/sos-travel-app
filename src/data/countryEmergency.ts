// Emergency numbers, one entry per country.
//
// To add a country: copy the Vietnam block, change every field, and give each
// number a real official source. Never add a number you couldn't check.
// `dial` is what the phone dials (digits only, + for international).

export type Source = {
  name: string
  url: string
}

export type EmergencyContact = {
  label: string
  description: string
  number: string // how it's shown on screen
  dial: string // what the phone dials
  kind: 'emergency' | 'embassy' | 'helpline'
  source: Source
}

export type CountryEmergency = {
  code: string
  name: string
  lastChecked: string // YYYY-MM-DD
  contacts: EmergencyContact[]
  tips: { text: string; source: Source }[]
  // Things we looked for but couldn't confirm yet, shown honestly on the page
  notYetConfirmed: { label: string; note: string }[]
}

const UK_VIETNAM: Source = {
  name: 'UK Government (FCDO), Vietnam travel advice: Getting help',
  url: 'https://www.gov.uk/foreign-travel-advice/vietnam/getting-help',
}

const INDIA_EMBASSY_CONTACT: Source = {
  name: 'Embassy of India, Hanoi: Contact Us',
  url: 'https://www.indembassyhanoi.gov.in/page/contact-us/',
}

const INDIA_EMBASSY_EMERGENCY: Source = {
  name: 'Embassy of India, Hanoi: Emergency contact number',
  url: 'https://www.indembassyhanoi.gov.in/page/emergency-contact-number',
}

const INDIA_112: Source = {
  name: 'Press Information Bureau: Pan-India Emergency Number 112 launched',
  url: 'https://www.pib.gov.in/newsite/PrintRelease.aspx?relid=188727&reg=3&lang=2',
}

const INDIA_ERSS: Source = {
  name: 'Ministry of Home Affairs: Emergency Response Support System (ERSS)',
  url: 'https://www.mha.gov.in/en/commoncontent/emergency-response-support-system-erss',
}

const INDIA_181: Source = {
  name: 'Govt of Haryana, Women & Child Development: Women Helpline 181',
  url: 'https://wcdhry.gov.in/women-helpline-number-181/',
}

const INDIA_TOURIST: Source = {
  name: 'Embassy of India, Sweden: Ministry of Tourism 24x7 tourist helpline',
  url: 'https://www.indembassysweden.gov.in/page/tourist-help-line-in-india/',
}

// The first country in this list is the one the page opens on.
export const COUNTRY_EMERGENCY: CountryEmergency[] = [
  {
    code: 'IN',
    name: 'India',
    lastChecked: '2026-11-24',
    contacts: [
      {
        label: 'Emergency (police, fire, ambulance)',
        description: 'One number for every emergency, anywhere in India',
        number: '112',
        dial: '112',
        kind: 'emergency',
        source: INDIA_112,
      },
      {
        label: 'Women Helpline',
        description: 'Free, 24 hours. For women facing violence or harassment.',
        number: '181',
        dial: '181',
        kind: 'helpline',
        source: INDIA_181,
      },
      {
        label: 'Tourist Helpline',
        description: 'Free, 24 hours, 365 days. Hindi, English and 10 other languages.',
        number: '1363',
        dial: '1363',
        kind: 'helpline',
        source: INDIA_TOURIST,
      },
      {
        label: 'Tourist Helpline (toll free)',
        description: 'Same helpline, longer number. Use this if 1363 does not connect.',
        number: '1800 11 1363',
        dial: '1800111363',
        kind: 'helpline',
        source: INDIA_TOURIST,
      },
    ],
    tips: [
      {
        text: 'The older numbers for police (100), fire (101) and ambulance (108) are being merged into 112, so 112 is the one to remember.',
        source: INDIA_ERSS,
      },
    ],
    notYetConfirmed: [],
  },
  {
    code: 'VN',
    name: 'Vietnam',
    lastChecked: '2026-11-24',
    contacts: [
      {
        label: 'Police',
        description: 'Theft, harassment, assault, feeling unsafe',
        number: '113',
        dial: '113',
        kind: 'emergency',
        source: UK_VIETNAM,
      },
      {
        label: 'Ambulance',
        description: 'Injury or medical emergency',
        number: '115',
        dial: '115',
        kind: 'emergency',
        source: UK_VIETNAM,
      },
      {
        label: 'Fire',
        description: 'Fire or smoke',
        number: '114',
        dial: '114',
        kind: 'emergency',
        source: UK_VIETNAM,
      },
      {
        label: 'Indian Embassy emergency line',
        description: 'Any time, for Indian citizens in trouble. Also on WhatsApp.',
        number: '+84 913 089 165',
        dial: '+84913089165',
        kind: 'embassy',
        source: INDIA_EMBASSY_EMERGENCY,
      },
      {
        label: 'Indian Embassy, Hanoi (office)',
        description: '58-60 Tran Hung Dao Street, Cua Nam Ward, Hanoi. Office hours.',
        number: '+84 24 3824 4989',
        dial: '+842438244989',
        kind: 'embassy',
        source: INDIA_EMBASSY_CONTACT,
      },
    ],
    tips: [
      {
        text: "Emergency lines in Vietnam are answered in Vietnamese. If you can, ask your hotel reception or someone nearby to call for you.",
        source: UK_VIETNAM,
      },
    ],
    notYetConfirmed: [
      {
        label: 'Tourist helpline',
        note: "We couldn't find a current official tourist helpline for Hanoi yet. Older news reports list one, but we couldn't confirm it still works, so we've left it out for now. For now, call the Indian Embassy emergency line.",
      },
    ],
  },
]

export function findCountry(code: string) {
  return COUNTRY_EMERGENCY.find((c) => c.code === code)
}
