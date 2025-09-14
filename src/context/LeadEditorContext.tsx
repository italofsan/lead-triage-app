import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react'
import type { Lead } from '../types'
import { validateEmail } from '../utils'

interface LeadEditorContextProps {
  selectedLead: Lead | null
  openLeadPanel: (lead: Lead) => void
  closeLeadPanel: () => void
  editEmail: string
  setEditEmail: Dispatch<SetStateAction<string>>
  editStatus: string
  setEditStatus: Dispatch<SetStateAction<string>>
  editError: string
  handleSave: (setLeads: React.Dispatch<SetStateAction<Lead[]>>) => void
  loading: boolean
  setSelectedLead: Dispatch<SetStateAction<Lead | null>>
}

const LeadEditorContext = createContext<LeadEditorContextProps | undefined>(
  undefined
)

export const LeadEditorProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [editEmail, setEditEmail] = useState('')
  const [editStatus, setEditStatus] = useState('')
  const [editError, setEditError] = useState('')
  const [loading, setLoading] = useState(false)

  const openLeadPanel = (lead: Lead) => {
    setSelectedLead(lead)
    setEditEmail(lead.email)
    setEditStatus(lead.status)
    setEditError('')
  }

  const closeLeadPanel = () => {
    setSelectedLead(null)
    setEditError('')
  }

  const handleSave = (setLeads: Dispatch<SetStateAction<Lead[]>>) => {
    setLoading(true)
    setEditError('')

    if (!validateEmail(editEmail)) {
      setEditError('Invalid email format')
      setLoading(false)
      return
    }

    if (!selectedLead) {
      return
    }

    setTimeout(() => {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === selectedLead.id
            ? { ...lead, email: editEmail, status: editStatus }
            : lead
        )
      )
      setSelectedLead(null)
      setLoading(false)
    }, 2000)
  }

  return (
    <LeadEditorContext.Provider
      value={{
        selectedLead,
        openLeadPanel,
        closeLeadPanel,
        editEmail,
        setEditEmail,
        editStatus,
        setEditStatus,
        editError,
        handleSave,
        loading,
        setSelectedLead,
      }}
    >
      {children}
    </LeadEditorContext.Provider>
  )
}

export const useLeadEditorContext = () => {
  const context = useContext(LeadEditorContext)
  if (!context)
    throw new Error('useLeadEditor must be used within a LeadEditorProvider')
  return context
}
