export type EmergencyNumberEntry = {
  countryCode: string
  countryName: string
  police: string
  ambulance: string
  fire: string
  general?: string
}

export type EmbassyEntry = {
  countryCode: string
  countryName: string
  embassyName: string
  phone: string
  address?: string
}
