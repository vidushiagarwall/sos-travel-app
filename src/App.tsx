import { useEffect, useState } from 'react'
import { NavBar, TABS, type Page } from './components/NavBar'
import { FEATURES } from './features'
import { Brand } from './components/Brand'
import { LandingPage } from './pages/LandingPage'
import { AuthPage } from './pages/AuthPage'
import { MapPage } from './pages/MapPage'
import { SOSPage } from './pages/SOSPage'
import { ContactsPage } from './pages/ContactsPage'
import { TripPlannerPage } from './pages/TripPlannerPage'
import { SafetyInfoPage } from './pages/SafetyInfoPage'
import { EmergencyNumbersPage } from './pages/EmergencyNumbersPage'
import { ShowScreenPage } from './pages/ShowScreenPage'
import { FamilyPage } from './pages/FamilyPage'
import { readFamilyLink } from './sharing/familyLink'

type View = 'landing' | 'login' | 'signup' | 'app'

function App() {
  const [view, setView] = useState<View>('landing')
  const [page, setPage] = useState<Page>(TABS[0].id)
  // false when someone jumps straight to emergency help without logging in
  const [signedIn, setSignedIn] = useState(false)
  // Family opening an "If you cannot reach her" link: the details are in the # part
  const [familyInfo, setFamilyInfo] = useState(() => readFamilyLink(window.location.hash))

  useEffect(() => {
    const onHash = () => setFamilyInfo(readFamilyLink(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const openEmergency = () => {
    setSignedIn(false)
    setPage('sos')
    setView('app')
  }

  if (familyInfo) return <FamilyPage info={familyInfo} />

  if (view === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => setView('signup')}
        onLogin={() => setView('login')}
        onEmergency={openEmergency}
      />
    )
  }

  if (view === 'login' || view === 'signup') {
    return (
      <AuthPage
        initialMode={view}
        onAuthenticated={() => {
          setSignedIn(true)
          setView('app')
        }}
        onBack={() => setView('landing')}
      />
    )
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <Brand onClick={() => setView('landing')} />
        <button className="btn btn-ghost" onClick={() => setView('landing')}>
          {signedIn ? 'Log out' : 'Home'}
        </button>
      </header>
      <main className="app-main">
        {page === 'map' && FEATURES.nearbySafety && <MapPage />}
        {page === 'sos' && <SOSPage onOpenContacts={() => setPage('contacts')} />}
        {page === 'numbers' && <EmergencyNumbersPage />}
        {page === 'show' && <ShowScreenPage onClose={() => setPage('sos')} />}
        {page === 'contacts' && <ContactsPage />}
        {page === 'trips' && FEATURES.trips && <TripPlannerPage />}
        {page === 'safety' && <SafetyInfoPage />}
      </main>
      <NavBar current={page} onChange={setPage} />
    </div>
  )
}

export default App
