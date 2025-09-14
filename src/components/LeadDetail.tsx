import { useLeadEditorContext } from '../context/LeadEditorContext'
import { useLeadsContext } from '../context/LeadsContext'
import { STATUS_OPTIONS } from '../utils/consts'

import { ErrorText } from './ErrorText'

export const LeadDetail = () => {
  const { loading, setLeads } = useLeadsContext()
  const {
    selectedLead,
    editEmail,
    editError,
    editStatus,
    closeLeadPanel,
    handleSave,
    setEditEmail,
    setEditStatus,
  } = useLeadEditorContext()

  return (
    <>
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
          disabled={loading}
        />
      </div>
      <div className='mb-2'>
        <strong>Status:</strong>
        <select
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
      <div className='mb-2'>
        <strong>Source:</strong> {selectedLead?.source}
      </div>
      <div className='mb-2'>
        <strong>Score:</strong> {selectedLead?.score}
      </div>
      {editError ? <ErrorText textError={editError} /> : null}

      <div className='flex gap-2 mt-4'>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50'
          onClick={() => handleSave(setLeads)}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button
          className='bg-gray-300 px-4 py-2 rounded'
          onClick={closeLeadPanel}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </>
  )
}
