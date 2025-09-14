import React, { useEffect, useState } from 'react'

type Lead = {
  id: number
  name: string
  company: string
  email: string
  source: string
  score: number
  status: string
}

const STATUS_OPTIONS = ['New', 'Contacted', 'Qualified']

type Opportunity = {
  id: number
  name: string
  stage: string
  amount?: number
  accountName: string
}

const STAGE_OPTIONS = ['Prospecting', 'Qualified', 'Proposal', 'Closed Won']

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

  // Validate email format
  const validateEmail = (email: string) => {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
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

  if (loading) return <div>Loading leads...</div>
  if (error) return <div className='text-red-500'>{error}</div>
  if (filteredLeads.length === 0) return <div>No leads found.</div>

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Leads</h1>
      <div className='flex gap-2 mb-4'>
        <input
          type='text'
          placeholder='Search name/company...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='border px-2 py-1 rounded'
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className='border px-2 py-1 rounded'
        >
          <option value=''>All Status</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <table className='min-w-full border'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='p-2 border'>Name</th>
            <th className='p-2 border'>Company</th>
            <th className='p-2 border'>Email</th>
            <th className='p-2 border'>Source</th>
            <th className='p-2 border'>Score</th>
            <th className='p-2 border'>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead) => (
            <tr
              key={lead.id}
              className='hover:bg-gray-50 cursor-pointer'
              onClick={() => openLeadPanel(lead)}
            >
              <td className='p-2 border'>{lead.name}</td>
              <td className='p-2 border'>{lead.company}</td>
              <td className='p-2 border'>{lead.email}</td>
              <td className='p-2 border'>{lead.source}</td>
              <td className='p-2 border'>{lead.score}</td>
              <td className='p-2 border'>{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Opportunities Table with states */}
      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Opportunities</h2>
        {opportunities.length === 0 ? (
          <div className='text-gray-500'>No opportunities yet.</div>
        ) : (
          <table className='min-w-full border'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='p-2 border'>Name</th>
                <th className='p-2 border'>Stage</th>
                <th className='p-2 border'>Amount</th>
                <th className='p-2 border'>Account Name</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp) => (
                <tr key={opp.id}>
                  <td className='p-2 border'>{opp.name}</td>
                  <td className='p-2 border'>{opp.stage}</td>
                  <td className='p-2 border'>
                    {opp.amount !== undefined ? `$${opp.amount}` : '-'}
                  </td>
                  <td className='p-2 border'>{opp.accountName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Slide-over panel */}
      {selectedLead && (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50'>
          <div className='bg-white w-96 h-full shadow-lg p-6 flex flex-col'>
            <h2 className='text-xl font-bold mb-4'>Lead Details</h2>
            <div className='mb-2'>
              <strong>Name:</strong> {selectedLead.name}
            </div>
            <div className='mb-2'>
              <strong>Company:</strong> {selectedLead.company}
            </div>
            <div className='mb-2'>
              <strong>Email:</strong>
              <input
                type='email'
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className='border px-2 py-1 rounded w-full mt-1'
                disabled={saving}
              />
            </div>
            <div className='mb-2'>
              <strong>Status:</strong>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className='border px-2 py-1 rounded w-full mt-1'
                disabled={saving}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-2'>
              <strong>Source:</strong> {selectedLead.source}
            </div>
            <div className='mb-2'>
              <strong>Score:</strong> {selectedLead.score}
            </div>
            {editError && <div className='text-red-500 mb-2'>{editError}</div>}
            <div className='flex gap-2 mt-4'>
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50'
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                className='bg-gray-300 px-4 py-2 rounded'
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>
            </div>
            <hr className='my-4' />
            <h3 className='text-lg font-semibold mb-2'>
              Convert to Opportunity
            </h3>
            <div className='mb-2'>
              <label className='block mb-1'>Stage</label>
              <select
                value={oppStage}
                onChange={(e) => setOppStage(e.target.value)}
                className='border px-2 py-1 rounded w-full'
              >
                {STAGE_OPTIONS.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-2'>
              <label className='block mb-1'>Amount (optional)</label>
              <input
                type='number'
                value={oppAmount}
                onChange={(e) => setOppAmount(e.target.value)}
                className='border px-2 py-1 rounded w-full'
                min='0'
              />
            </div>
            {oppError && <div className='text-red-500 mb-2'>{oppError}</div>}
            <button
              className='bg-green-500 text-white px-4 py-2 rounded mt-2'
              onClick={() => {
                setOppError('')
                if (!selectedLead) return
                // Validate amount
                if (oppAmount && isNaN(Number(oppAmount))) {
                  setOppError('Amount must be a number')
                  return
                }
                // Create opportunity
                setOpportunities((prev) => [
                  ...prev,
                  {
                    id: Date.now(),
                    name: selectedLead.name,
                    stage: oppStage,
                    amount: oppAmount ? Number(oppAmount) : undefined,
                    accountName: selectedLead.company,
                  },
                ])
                setSelectedLead(null)
                setOppAmount('')
                setOppStage(STAGE_OPTIONS[0])
              }}
            >
              Convert Lead
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
