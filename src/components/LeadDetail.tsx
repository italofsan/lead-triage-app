import { useLeadEditorContext } from '../context/LeadEditorContext'
import { useLeadsContext } from '../context/LeadsContext'
import { STATUS_OPTIONS } from '../utils/consts'

import { ErrorText } from './ErrorText'

export const LeadDetail = () => {
  const { setLeads } = useLeadsContext()
  const {
    selectedLead,
    editEmail,
    editError,
    editStatus,
    closeLeadPanel,
    handleSave,
    setEditEmail,
    setEditStatus,
    loading,
  } = useLeadEditorContext()

  return (
    <>
      <div className='mb-2 flex flex-row items-center gap-1'>
        <label htmlFor='lead-name' className='font-semibold block'>
          Name:
        </label>
        <span id='lead-name'>{selectedLead?.name}</span>
      </div>
      <div className='mb-2 flex flex-row items-center gap-1'>
        <label htmlFor='lead-company' className='font-semibold block'>
          Company:
        </label>
        <span id='lead-company'>{selectedLead?.company}</span>
      </div>

      <div className='mb-2'>
        <label htmlFor='lead-email' className='font-semibold block'>
          Email:
        </label>
        <input
          id='lead-email'
          type='email'
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
          className='border px-2 py-1 rounded w-full mt-1'
          disabled={loading}
        />
      </div>

      <div className='mb-2'>
        <label htmlFor='lead-status' className='font-semibold block'>
          Status:
        </label>
        <select
          id='lead-status'
          value={editStatus}
          onChange={(e) => setEditStatus(e.target.value)}
          className='border px-2 py-1 rounded w-full mt-1'
          disabled={loading}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className='mb-2 flex flex-row items-center gap-1'>
        <label htmlFor='lead-source' className='font-semibold block'>
          Source:
        </label>
        <span id='lead-source'>{selectedLead?.source}</span>
      </div>

      <div className='mb-2 flex flex-row items-center gap-1'>
        <label htmlFor='lead-score' className='font-semibold block'>
          Score:
        </label>
        <span id='lead-score'>{selectedLead?.score}</span>
      </div>
      {editError ? <ErrorText textError={editError} /> : null}

      <div className='flex gap-2 mt-4'>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 ${
            loading ? '' : 'cursor-pointer'
          }`}
          onClick={() => handleSave(setLeads)}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button
          className='bg-gray-300 px-4 py-2 rounded cursor-pointer'
          onClick={closeLeadPanel}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </>
  )
}
