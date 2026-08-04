import { useState } from 'react'
import { NavBar, type Page } from './components/NavBar'
import { MapPage } from './pages/MapPage'
import { SOSPage } from './pages/SOSPage'
import { ContactsPage } from './pages/ContactsPage'
import { TripPlannerPage } from './pages/TripPlannerPage'
import { SafetyInfoPage } from './pages/SafetyInfoPage'

function App() {
  const [page, setPage] = useState<Page>('map')

  return (
    <>
      {page === 'map' && <MapPage />}
      {page === 'sos' && <SOSPage />}
      {page === 'contacts' && <ContactsPage />}
      {page === 'trips' && <TripPlannerPage />}
      {page === 'safety' && <SafetyInfoPage />}
      <NavBar current={page} onChange={setPage} />
    </>
  )
}

export default App
