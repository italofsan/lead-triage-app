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

interface LeadsContextProps {
  leads: Lead[]
  setLeads: Dispatch<SetStateAction<Lead[]>>
  filteredLeads: Lead[]
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  statusFilter: string
  setStatusFilter: Dispatch<SetStateAction<string>>
  sortBy: 'id' | 'score'
  setSortBy: Dispatch<SetStateAction<'id' | 'score'>>
  loading: boolean
  error: string
}

const LeadsContext = createContext<LeadsContextProps | undefined>(undefined)

export const LeadsProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortBy, setSortBy] = useState<'id' | 'score'>('id')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Load leads
  useEffect(() => {
    setLoading(true)
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

  // Filter and sort
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
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        sortBy,
        setSortBy,
        loading,
        error,
      }}
    >
      {children}
    </LeadsContext.Provider>
  )
}

export const useLeadsContext = () => {
  const context = useContext(LeadsContext)
  if (!context) throw new Error('useLeads must be used within a LeadsProvider')
  return context
}
