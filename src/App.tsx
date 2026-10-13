import { useState } from 'react'
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

type View = 'landing' | 'login' | 'signup' | 'app'

function App() {
  const [view, setView] = useState<View>('landing')
  const [page, setPage] = useState<Page>(TABS[0].id)

  if (view === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => setView('signup')}
        onLogin={() => setView('login')}
      />
    )
  }

  if (view === 'login' || view === 'signup') {
    return (
      <AuthPage
        initialMode={view}
        onAuthenticated={() => setView('app')}
        onBack={() => setView('landing')}
      />
    )
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <Brand onClick={() => setView('landing')} />
        <button className="btn btn-ghost" onClick={() => setView('landing')}>
          Log out
        </button>
      </header>
      <main className="app-main">
        {page === 'map' && FEATURES.nearbySafety && <MapPage />}
        {page === 'sos' && <SOSPage />}
        {page === 'contacts' && <ContactsPage />}
        {page === 'trips' && FEATURES.trips && <TripPlannerPage />}
        {page === 'safety' && <SafetyInfoPage />}
      </main>
      <NavBar current={page} onChange={setPage} />
    </div>
  )
}

export default App
