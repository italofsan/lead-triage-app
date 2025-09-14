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
    <div className='p-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200'>
      <div className='max-w-5xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6 text-gray-700 rounded-xl bg-white shadow px-6 py-4'>
          Leads
        </h1>

        <div className='flex gap-4 mb-6 rounded-xl bg-white shadow px-6 py-4'>
          <Search />
          <Filter />
          <Sort />
        </div>

        <div className='mb-8'>
          <TableLeads />
        </div>
        <div className='mb-8'>
          <TableOpportunities />
        </div>

        {selectedLead ? <SlideOverPanel /> : null}
      </div>
    </div>
  )
}
