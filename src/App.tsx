import { AppProviders } from './providers'

import { Dashboard } from './pages/Dashboard'

import './styles/global.css'

export function App() {
  return (
    <AppProviders>
      <Dashboard />
    </AppProviders>
  )
}
