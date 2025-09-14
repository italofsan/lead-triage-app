import { useLeadEditorContext } from '../context/LeadEditorContext'

import { TableOpportunities } from '../components/TableOpportunities'
import { SlideOverPanel } from '../components/SlideOverPanel'
import { TableLeads } from '../components/TableLeads'
import { Search } from '../components/Search'
import { Filter } from '../components/Filter'
import { Sort } from '../components/Sort'

export const Dashboard = () => {
  const { selectedLead } = useLeadEditorContext()

  return (
    <div className='p-2 sm:p-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200'>
      <div className='max-w-full sm:max-w-5xl mx-auto'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-700 rounded-xl bg-white shadow px-3 py-3 sm:px-6 sm:py-4'>
          Leads
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 rounded-xl bg-white shadow px-2 py-2 sm:px-6 sm:py-4'>
          <Search />
          <Filter />
          <Sort />
        </div>

        <div className='mb-6 sm:mb-8'>
          <TableLeads />
        </div>
        <div className='mb-6 sm:mb-8'>
          <TableOpportunities />
        </div>

        {selectedLead ? <SlideOverPanel /> : null}
      </div>
    </div>
  )
}
