import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react'

import type { Lead } from '../types'
import { validateEmail } from '../utils'

interface LeadsContextProps {
  openLeadPanel: (lead: Lead) => void
  leads: Lead[]
  setLeads: Dispatch<SetStateAction<Lead[]>>
  filteredLeads: Lead[]
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  statusFilter: string
  setStatusFilter: Dispatch<SetStateAction<string>>
  loading: boolean
  error: string
  sortBy: 'id' | 'score'
  setSortBy: Dispatch<SetStateAction<'id' | 'score'>>
  selectedLead: Lead | null
  setSelectedLead: Dispatch<SetStateAction<Lead | null>>
  editEmail: string
  setEditEmail: Dispatch<SetStateAction<string>>
  editStatus: string
  setEditStatus: Dispatch<SetStateAction<string>>
  editError: string
  setEditError: Dispatch<SetStateAction<string>>
  saving: boolean
  handleSave: () => void
  handleCancel: () => void
}

const LeadsContext = createContext<LeadsContextProps | undefined>(undefined)

export const LeadsProvider = ({ children }: { children: ReactNode }) => {
  const openLeadPanel = (lead: Lead) => {
    setSelectedLead(lead)
    setEditEmail(lead.email)
    setEditStatus(lead.status)
    setEditError('')
  }
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState<'id' | 'score'>('id')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [editEmail, setEditEmail] = useState('')
  const [editStatus, setEditStatus] = useState('')
  const [editError, setEditError] = useState('')
  const [saving, setSaving] = useState(false)
  const handleSave = () => {
    setSaving(true)
    setEditError('')
    if (!validateEmail(editEmail)) {
      setEditError('Invalid email format')
      setSaving(false)
      return
    }
    if (!selectedLead) return
    setTimeout(() => {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === selectedLead.id
            ? { ...lead, email: editEmail, status: editStatus }
            : lead
        )
      )
      setSelectedLead(null)
      setSaving(false)
    }, 500)
  }

  const handleCancel = () => {
    setSelectedLead(null)
    setEditError('')
  }

  useEffect(() => {
    setTimeout(() => {
      fetch('/leads.json')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to load leads')
          return res.json()
        })
        .then((data) => {
          setLeads(data)
          setLoading(false)
        })
        .catch(() => {
          setError('Error loading leads')
          setLoading(false)
        })
    }, 2000)
  }, [])

  useEffect(() => {
    let result = leads
    if (search) {
      const s = search.toLowerCase()
      result = result.filter(
        (lead) =>
          lead.name.toLowerCase().includes(s) ||
          lead.company.toLowerCase().includes(s)
      )
    }
    if (statusFilter) {
      result = result.filter((lead) => lead.status === statusFilter)
    }
    if (sortBy === 'id') {
      result = [...result].sort((a, b) => a.id - b.id)
    } else {
      result = [...result].sort((a, b) => b.score - a.score)
    }
    setFilteredLeads(result)
  }, [leads, search, statusFilter, sortBy])

  return (
    <LeadsContext.Provider
      value={{
        leads,
        setLeads,
        filteredLeads,
        openLeadPanel,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        loading,
        error,
        sortBy,
        setSortBy,
        selectedLead,
        setSelectedLead,
        editEmail,
        setEditEmail,
        editStatus,
        setEditStatus,
        editError,
        setEditError,
        saving,
        handleSave,
        handleCancel,
      }}
    >
      {children}
    </LeadsContext.Provider>
  )
}

export const useLeadsContext = () => {
  const context = useContext(LeadsContext)
  if (!context) {
    throw new Error('useLeadsContext must be used within a LeadsProvider')
  }
  return context
}
