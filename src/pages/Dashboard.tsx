import { useLeadsContext } from '../context/LeadsContext'

import { TableOpportunities } from '../components/TableOpportunities'
import { SlideOverPanel } from '../components/SlideOverPanel'
import { TableLeads } from '../components/TableLeads'
import { Search } from '../components/Search'
import { Filter } from '../components/Filter'
import { Sort } from '../components/Sort'

export const Dashboard = () => {
  const { selectedLead } = useLeadsContext()

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Leads</h1>

      <div className='flex gap-2 mb-4'>
        <Search />
        <Filter />
        <Sort />
      </div>

      <TableLeads />
      <TableOpportunities />

      {selectedLead ? <SlideOverPanel /> : null}
    </div>
  )
}
