import { useLeadEditorContext } from '../context/LeadEditorContext'

import { LeadConvert } from './LeadConvert'
import { LeadDetail } from './LeadDetail'

export const SlideOverPanel = () => {
  const { closeLeadPanel } = useLeadEditorContext()

  return (
    <div
      className='fixed inset-0 bg-transparent flex justify-end z-50'
      onClick={closeLeadPanel}
    >
      <div
        className='bg-white w-96 h-full shadow-2xl p-6 flex flex-col rounded-l-2xl overflow-y-auto border border-gray-200'
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className='text-xl font-bold mb-4 text-gray-700 rounded-xl bg-gray-100 shadow px-4 py-2'>
          Lead Details
        </h2>
        <LeadDetail />
        <hr className='my-4' />
        <LeadConvert />
      </div>
    </div>
  )
}
