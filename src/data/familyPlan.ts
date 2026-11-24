// Contacts used on the "If you cannot reach her" page, which family in India open.
// Every number has an official source. Never add one you couldn't check.

export type FamilySource = { name: string; url: string }

export type FamilyNumber = {
  label: string
  number: string // shown on screen
  dial: string // what the phone dials
  whatsapp?: string // digits only, for wa.me links
  source: FamilySource
}

export type Destination = {
  code: string
  city: string
  country: string
  lastChecked: string
  embassy: { name: string; address: string; numbers: FamilyNumber[] }
  police: { note: string; source: FamilySource }
}

export const DESTINATIONS: Destination[] = [
  {
    code: 'VN-HAN',
    city: 'Hanoi',
    country: 'Vietnam',
    lastChecked: '2026-11-24',
    embassy: {
      name: 'Embassy of India, Hanoi',
      address: '58-60 Tran Hung Dao Street, Cua Nam Ward, Hanoi',
      numbers: [
        {
          label: 'Emergency line (also WhatsApp)',
          number: '+84 913 089 165',
          dial: '+84913089165',
          whatsapp: '84913089165',
          source: {
            name: 'Embassy of India, Hanoi: Emergency contact number',
            url: 'https://www.indembassyhanoi.gov.in/page/emergency-contact-number',
          },
        },
        {
          label: 'Office (working hours)',
          number: '+84 24 3824 4989',
          dial: '+842438244989',
          source: {
            name: 'Embassy of India, Hanoi: Contact Us',
            url: 'https://www.indembassyhanoi.gov.in/page/contact-us/',
          },
        },
      ],
    },
    police: {
      note: "We couldn't confirm a tourist police number for Hanoi. Vietnam's police number is 113, but it only works from a phone inside Vietnam, so you can't call it from India. Ask the hotel or the embassy to report it to the local police for you.",
      source: {
        name: 'UK Government (FCDO), Vietnam travel advice: Getting help',
        url: 'https://www.gov.uk/foreign-travel-advice/vietnam/getting-help',
      },
    },
  },
]

export const MEA_NUMBERS: FamilyNumber[] = [
  {
    label: 'MEA control room, toll free from India',
    number: '1800 11 8797',
    dial: '1800118797',
    source: {
      name: 'Ministry of External Affairs advisory, March 2026',
      url: 'https://www.mea.gov.in/Images/CPV/4408-02-english-2026.pdf',
    },
  },
  {
    label: 'MEA control room, South Block, New Delhi',
    number: '+91 11 2301 1954',
    dial: '+911123011954',
    source: {
      name: 'Ministry of External Affairs: Contact',
      url: 'https://www.mea.gov.in/contact-tele-inquiry',
    },
  },
]

export const MADAD = {
  name: 'MADAD, the MEA portal for Indians abroad',
  url: 'https://madad.gov.in',
}

export function findDestination(code: string) {
  return DESTINATIONS.find((d) => d.code === code)
}
