import { useLeadsContext } from '../context/LeadsContext'

import { TableOpportunities } from '../components/TableOpportunities'
import { SlideOverPanel } from '../components/SlideOverPanel'
import { TableLeads } from '../components/TableLeads'
import { Search } from '../components/Search'
import { Filter } from '../components/Filter'

export const Dashboard = () => {
  const { sortBy, setSortBy, selectedLead } = useLeadsContext()

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

      <TableLeads />
      <TableOpportunities />

      {selectedLead ? <SlideOverPanel /> : null}
    </div>
  )
}
