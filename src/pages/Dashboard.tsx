import { useState } from 'react'

import { useLeadsContext } from '../context/LeadsContext'

import type { Lead, Opportunity } from '../types'
import { STAGE_OPTIONS } from '../utils/consts'
import { validateEmail } from '../utils'

import { TableOpportunities } from '../components/TableOpportunities'
import { SlideOverPanel } from '../components/SlideOverPanel'
import { TableLeads } from '../components/TableLeads'
import { Search } from '../components/Search'
import { Filter } from '../components/Filter'

export const Dashboard = () => {
  const { setLeads, filteredLeads, loading, error, sortBy, setSortBy } =
    useLeadsContext()
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const [saving, setSaving] = useState(false)
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])

  const [editEmail, setEditEmail] = useState('')
  const [editStatus, setEditStatus] = useState('')
  const [editError, setEditError] = useState('')

  const [oppStage, setOppStage] = useState(STAGE_OPTIONS[0])
  const [oppAmount, setOppAmount] = useState('')
  const [oppError, setOppError] = useState('')

  const openLeadPanel = (lead: Lead) => {
    setSelectedLead(lead)
    setEditEmail(lead.email)
    setEditStatus(lead.status)
    setEditError('')
  }

  const handleSave = () => {
    setSaving(true)
    setEditError('')
    if (!validateEmail(editEmail)) {
      setEditError('Invalid email format')
      setSaving(false)
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
      setSaving(false)
    }, 500)
  }

  const handleCancel = () => {
    setSelectedLead(null)
    setEditError('')
  }

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Leads</h1>

      <div className='flex gap-2 mb-4'>
        <Search />
        <Filter />
        <div>
          <label className='mr-2 font-medium'>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'id' | 'score')}
            className='border rounded px-2 py-1'
          >
            <option value='id'>ID</option>
            <option value='score'>Score (desc)</option>
          </select>
        </div>
      </div>

      <TableLeads
        filteredLeads={filteredLeads}
        openLeadPanel={openLeadPanel}
        loading={loading}
        error={error}
      />
      <TableOpportunities opportunities={opportunities} />

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
          setLeads={setLeads}
        />
      ) : null}
    </div>
  )
}
