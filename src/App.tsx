import { LeadsProvider } from './context/LeadsContext'
import { Dashboard } from './pages/Dashboard'

import './styles/global.css'

export function App() {
  return (
    <LeadsProvider>
      <Dashboard />
    </LeadsProvider>
  )
}
