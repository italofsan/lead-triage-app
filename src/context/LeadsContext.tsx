import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import type { ReactNode, Dispatch, SetStateAction } from 'react'

import { getItem, setItem } from '../utils/storage'
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
  const [statusFilter, setStatusFilter] = useState(
    () => getItem('leadStatusFilter') || ''
  )
  const [sortBy, setSortBy] = useState<'id' | 'score'>(
    (getItem('leadSortBy') as 'id' | 'score') || 'id'
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setItem('leadStatusFilter', statusFilter)
  }, [statusFilter])

  useEffect(() => {
    setItem('leadSortBy', sortBy)
  }, [sortBy])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      fetch('/leads.json')
        .then((response) => {
          if (!response.ok) throw new Error('Failed to load leads')
          return response.json()
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

  // Filtered leads (useMemo)
  const filtered = useMemo(() => {
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
    return result
  }, [leads, search, statusFilter])

  useEffect(() => {
    let sorted = [...filtered]
    if (sortBy === 'id') {
      sorted = sorted.sort((leadA, leadB) => leadA.id - leadB.id)
    } else {
      sorted = sorted.sort((leadA, leadB) => leadB.score - leadA.score)
    }
    setFilteredLeads(sorted)
  }, [filtered, sortBy])

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
