import { useState } from 'react'
import { NavBar, type Page } from './components/NavBar'
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
  const [page, setPage] = useState<Page>('map')

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
        {page === 'map' && <MapPage />}
        {page === 'sos' && <SOSPage />}
        {page === 'contacts' && <ContactsPage />}
        {page === 'trips' && <TripPlannerPage />}
        {page === 'safety' && <SafetyInfoPage />}
      </main>
      <NavBar current={page} onChange={setPage} />
    </div>
  )
}

export default App
