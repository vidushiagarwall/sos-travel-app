export function buildSmsLink(phoneNumbers: string[], message: string): string {
  const numbers = phoneNumbers.join(',')
  return `sms:${numbers}?body=${encodeURIComponent(message)}`
}

export function buildWhatsAppLink(message: string, phoneNumber?: string): string {
  const target = phoneNumber ? phoneNumber.replace(/[^\d]/g, '') : ''
  return `https://wa.me/${target}?text=${encodeURIComponent(message)}`
}

export function buildMailtoLink(message: string, subject: string): string {
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

// WhatsApp only finds a number written in full, with the country code (+91 ...).
export function hasCountryCode(phoneNumber: string): boolean {
  const n = phoneNumber.trim()
  return (n.startsWith('+') || n.startsWith('00')) && n.replace(/\D/g, '').length >= 8
}
