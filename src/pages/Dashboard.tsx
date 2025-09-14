import { useEffect, useState } from 'react'
import type { Lead, Opportunity } from '../types'
import { validateEmail } from '../utils'
import { TableLeads } from '../components/TableLeads'
import { TableOpportunities } from '../components/TableOpportunities'
import { Search } from '../components/Search'
import { STAGE_OPTIONS } from '../utils/consts'
import { Filter } from '../components/Filter'
import { SlideOverPanel } from '../components/SlideOverPanel'

export const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [editEmail, setEditEmail] = useState('')
  const [editStatus, setEditStatus] = useState('')
  const [editError, setEditError] = useState('')
  const [saving, setSaving] = useState(false)
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [oppStage, setOppStage] = useState(STAGE_OPTIONS[0])
  const [oppAmount, setOppAmount] = useState('')
  const [oppError, setOppError] = useState('')

  useEffect(() => {
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
    result = [...result].sort((a, b) => b.score - a.score)
    setFilteredLeads(result)
  }, [leads, search, statusFilter])

  // Open panel and set edit fields
  const openLeadPanel = (lead: Lead) => {
    setSelectedLead(lead)
    setEditEmail(lead.email)
    setEditStatus(lead.status)
    setEditError('')
  }

  // Save changes
  const handleSave = () => {
    setSaving(true)
    setEditError('')
    if (!validateEmail(editEmail)) {
      setEditError('Invalid email format')
      setSaving(false)
      return
    }
    if (!selectedLead) return
    // Simulate save
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

  // Cancel edit
  const handleCancel = () => {
    setSelectedLead(null)
    setEditError('')
  }

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Leads</h1>

      <div className='flex gap-2 mb-4'>
        <Search search={search} setSearch={setSearch} />
        <Filter statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      </div>

      <TableLeads
        filteredLeads={filteredLeads}
        openLeadPanel={openLeadPanel}
        loading={loading}
        error={error}
      />
      <TableOpportunities opportunities={opportunities} />

      {/* Slide-over panel */}
      {selectedLead ? (
        <SlideOverPanel
          editEmail={editEmail}
          editStatus={editStatus}
          editError={editError}
          saving={saving}
          setEditEmail={setEditEmail}
          selectedLead={selectedLead}
          setEditStatus={setEditStatus}
          handleSave={handleSave}
          handleCancel={handleCancel}
          oppStage={oppStage}
          setOppStage={setOppStage}
          oppAmount={oppAmount}
          setOppAmount={setOppAmount}
          oppError={oppError}
          setOppError={setOppError}
          setOpportunities={setOpportunities}
          setSelectedLead={setSelectedLead}
        />
      ) : null}
    </div>
  )
}
