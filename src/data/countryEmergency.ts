// Emergency numbers, one entry per country.
//
// To add a country: copy the India block, change every field, and give each
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
]

export function findCountry(code: string) {
  return COUNTRY_EMERGENCY.find((c) => c.code === code)
}
