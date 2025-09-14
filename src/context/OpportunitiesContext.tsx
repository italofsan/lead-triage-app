import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react'
import type { Opportunity, Lead } from '../types'
import { STAGE_OPTIONS } from '../utils/consts'

interface OpportunitiesContextProps {
  opportunities: Opportunity[]
  setOpportunities: Dispatch<SetStateAction<Opportunity[]>>
  oppStage: string
  setOppStage: Dispatch<SetStateAction<string>>
  oppAmount: string
  setOppAmount: Dispatch<SetStateAction<string>>
  oppError: string
  setOppError: Dispatch<SetStateAction<string>>
  handleConvertLead: (
    selectedLead: Lead | null,
    setLeads: Dispatch<SetStateAction<Lead[]>>,
    setSelectedLead: Dispatch<SetStateAction<Lead | null>>
  ) => void
  loading: boolean
}

const OpportunitiesContext = createContext<
  OpportunitiesContextProps | undefined
>(undefined)

export const OpportunitiesProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [oppStage, setOppStage] = useState(STAGE_OPTIONS[0])
  const [oppAmount, setOppAmount] = useState('')
  const [oppError, setOppError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleConvertLead(
    selectedLead: Lead | null,
    setLeads: Dispatch<SetStateAction<Lead[]>>,
    setSelectedLead: Dispatch<SetStateAction<Lead | null>>
  ) {
    setLoading(true)

    setTimeout(() => {
      setOppError('')
      if (!selectedLead) {
        return
      }
      // Validate amount
      if (oppAmount && isNaN(Number(oppAmount))) {
        setOppError('Amount must be a number')
        return
      }
      // Create opportunity
      setOpportunities((prevState) => [
        ...prevState,
        {
          id: Date.now(),
          name: selectedLead?.name,
          stage: oppStage,
          amount: oppAmount ? Number(oppAmount) : undefined,
          accountName: selectedLead?.company,
        },
      ])
      // Remove lead from list
      setLeads((prevState) =>
        prevState.filter((lead) => lead.id !== selectedLead?.id)
      )
      setSelectedLead(null)
      setOppAmount('')
      setOppStage(STAGE_OPTIONS[0])
      setLoading(false)
    }, 2000)
  }

  return (
    <OpportunitiesContext.Provider
      value={{
        opportunities,
        setOpportunities,
        oppStage,
        setOppStage,
        oppAmount,
        setOppAmount,
        oppError,
        setOppError,
        handleConvertLead,
        loading,
      }}
    >
      {children}
    </OpportunitiesContext.Provider>
  )
}

export const useOpportunitiesContext = () => {
  const context = useContext(OpportunitiesContext)
  if (!context)
    throw new Error(
      'useOpportunities must be used within an OpportunitiesProvider'
    )
  return context
}
