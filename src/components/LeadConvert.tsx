import { useOpportunitiesContext } from '../context/OpportunitiesContext'
import { useLeadEditorContext } from '../context/LeadEditorContext'
import { useLeadsContext } from '../context/LeadsContext'
import { STAGE_OPTIONS } from '../utils/consts'

import { ErrorText } from './ErrorText'

export const LeadConvert = () => {
  const { setLeads } = useLeadsContext()
  const {
    oppError,
    oppStage,
    oppAmount,
    setOppAmount,
    handleConvertLead,
    setOppStage,
    loading,
  } = useOpportunitiesContext()
  const { selectedLead, setSelectedLead } = useLeadEditorContext()

  return (
    <>
      <h3 className='text-lg font-semibold mb-2'>Convert to Opportunity</h3>
      <div className='mb-2'>
        <label className='block mb-1'>Stage</label>
        <select
          value={oppStage}
          onChange={(e) => setOppStage(e.target.value)}
          className='border border-gray-200 bg-gray-50 px-3 py-2 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50 transition duration-150'
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
          className='border border-gray-200 bg-gray-50 px-3 py-2 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:opacity-50 transition duration-150'
          min='0'
        />
      </div>
      {oppError ? <ErrorText textError={oppError} /> : null}

      <button
        className={`bg-green-600 text-white px-4 py-2 rounded-lg mt-2 shadow-sm hover:bg-green-700 transition duration-150 disabled:opacity-50 ${
          loading ? '' : 'cursor-pointer'
        }`}
        onClick={() =>
          handleConvertLead(selectedLead, setLeads, setSelectedLead)
        }
        disabled={loading}
      >
        {loading ? 'Converting...' : 'Convert Lead'}
      </button>
    </>
  )
}
