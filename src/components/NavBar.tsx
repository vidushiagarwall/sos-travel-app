export type Page = 'map' | 'sos' | 'contacts' | 'trips' | 'safety'

const TABS: { id: Page; label: string }[] = [
  { id: 'map', label: 'Map' },
  { id: 'sos', label: 'SOS' },
  { id: 'contacts', label: 'Contacts' },
  { id: 'trips', label: 'Trips' },
  { id: 'safety', label: 'Safety Info' },
]

export function NavBar({ current, onChange }: { current: Page; onChange: (page: Page) => void }) {
  return (
    <nav className="navbar">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={tab.id === current ? 'nav-tab active' : 'nav-tab'}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
