import { IconMap, IconSOS, IconUsers, IconRoute, IconInfo } from './icons'

export type Page = 'map' | 'sos' | 'contacts' | 'trips' | 'safety'

const TABS: { id: Page; label: string; Icon: typeof IconMap }[] = [
  { id: 'map', label: 'Map', Icon: IconMap },
  { id: 'sos', label: 'SOS', Icon: IconSOS },
  { id: 'contacts', label: 'Contacts', Icon: IconUsers },
  { id: 'trips', label: 'Trips', Icon: IconRoute },
  { id: 'safety', label: 'Safety', Icon: IconInfo },
]

export function NavBar({ current, onChange }: { current: Page; onChange: (page: Page) => void }) {
  return (
    <nav className="navbar">
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={
            (id === current ? 'nav-tab active' : 'nav-tab') + (id === 'sos' ? ' sos' : '')
          }
          onClick={() => onChange(id)}
        >
          <Icon />
          {label}
        </button>
      ))}
    </nav>
  )
}
