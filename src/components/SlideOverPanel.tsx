import { STAGE_OPTIONS, STATUS_OPTIONS } from '../utils/consts'
import type { Lead, Opportunity } from '../types'

type SlideOverPanelProps = {
  selectedLead: Lead | null
  setSelectedLead: (value: React.SetStateAction<any>) => void
  editEmail: string
  setEditEmail: (value: React.SetStateAction<string>) => void
  editStatus: string
  setEditStatus: (value: React.SetStateAction<string>) => void
  editError: string
  saving: boolean
  handleSave: () => void
  handleCancel: () => void
  oppStage: string
  setOppStage: (value: React.SetStateAction<string>) => void
  oppAmount: string
  setOppAmount: (value: React.SetStateAction<string>) => void
  oppError: string
  setOppError: (value: React.SetStateAction<string>) => void
  setOpportunities: React.Dispatch<React.SetStateAction<Opportunity[]>>
}

export const SlideOverPanel = ({
  setSelectedLead,
  selectedLead,
  editEmail,
  editError,
  editStatus,
  handleCancel,
  handleSave,
  oppAmount,
  oppError,
  oppStage,
  saving,
  setEditEmail,
  setEditStatus,
  setOppAmount,
  setOppError,
  setOppStage,
  setOpportunities,
}: SlideOverPanelProps) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50'>
      <div className='bg-white w-96 h-full shadow-lg p-6 flex flex-col'>
        <h2 className='text-xl font-bold mb-4'>Lead Details</h2>
        <div className='mb-2'>
          <strong>Name:</strong> {selectedLead?.name}
        </div>
        <div className='mb-2'>
          <strong>Company:</strong> {selectedLead?.company}
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
          <strong>Source:</strong> {selectedLead?.source}
        </div>
        <div className='mb-2'>
          <strong>Score:</strong> {selectedLead?.score}
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
                name: selectedLead?.name,
                stage: oppStage,
                amount: oppAmount ? Number(oppAmount) : undefined,
                accountName: selectedLead?.company,
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
  )
}
