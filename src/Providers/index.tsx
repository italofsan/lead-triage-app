import type { ReactNode } from 'react'

import { OpportunitiesProvider } from '../context/OpportunitiesContext'
import { LeadEditorProvider } from '../context/LeadEditorContext'
import { LeadsProvider } from '../context/LeadsContext'

type Props = { children: ReactNode }

export const AppProviders = ({ children }: Props) => {
  return (
    <LeadsProvider>
      <LeadEditorProvider>
        <OpportunitiesProvider>{children}</OpportunitiesProvider>
      </LeadEditorProvider>
    </LeadsProvider>
  )
}
