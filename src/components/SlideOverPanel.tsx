import { STAGE_OPTIONS } from '../utils/consts'
import type { Opportunity } from '../types'
import { ErrorText } from './ErrorText'
import { useState } from 'react'
import { LeadDetail } from './LeadDetail'
import { useLeadsContext } from '../context/LeadsContext'

type SlideOverPanelProps = {
  oppStage: string
  setOppStage: (value: React.SetStateAction<string>) => void
  oppAmount: string
  setOppAmount: (value: React.SetStateAction<string>) => void
  oppError: string
  setOppError: (value: React.SetStateAction<string>) => void
  setOpportunities: React.Dispatch<React.SetStateAction<Opportunity[]>>
}

export const SlideOverPanel = ({
  oppAmount,
  oppError,
  oppStage,
  setOppAmount,
  setOppError,
  setOppStage,
  setOpportunities,
}: SlideOverPanelProps) => {
  const { selectedLead, setSelectedLead, setLeads, handleCancel } =
    useLeadsContext()
  const [loading, setLoading] = useState(false)

  function handleConvertLead() {
    setLoading(true)

    setTimeout(() => {
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
          name: selectedLead?.name,
          stage: oppStage,
          amount: oppAmount ? Number(oppAmount) : undefined,
          accountName: selectedLead?.company,
        },
      ])
      // Remove lead from list
      setLeads((prev) => prev.filter((l) => l.id !== selectedLead?.id))
      setSelectedLead(null)
      setOppAmount('')
      setOppStage(STAGE_OPTIONS[0])
      setLoading(false)
    }, 2000)
  }

  return (
    <div
      className='fixed inset-0 bg-transparent flex justify-end z-50'
      onClick={handleCancel}
    >
      <div
        className='bg-white w-96 h-full shadow-2xl p-6 flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-xl font-bold mb-4'>Lead Details</h2>
        <LeadDetail />

        <hr className='my-4' />

        <h3 className='text-lg font-semibold mb-2'>Convert to Opportunity</h3>
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
        {oppError ? <ErrorText textError={oppError} /> : null}

        <button
          className='bg-green-500 text-white px-4 py-2 rounded mt-2'
          onClick={handleConvertLead}
          disabled={loading}
        >
          {loading ? 'Converting...' : 'Convert Lead'}
        </button>
      </div>
    </div>
  )
}
