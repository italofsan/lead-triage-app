import { useState } from 'react'

import { useLeadsContext } from '../context/LeadsContext'

import type { Opportunity } from '../types'
import { STAGE_OPTIONS } from '../utils/consts'

import { TableOpportunities } from '../components/TableOpportunities'
import { SlideOverPanel } from '../components/SlideOverPanel'
import { TableLeads } from '../components/TableLeads'
import { Search } from '../components/Search'
import { Filter } from '../components/Filter'

export const Dashboard = () => {
  const { sortBy, setSortBy, selectedLead } = useLeadsContext()

  const [opportunities, setOpportunities] = useState<Opportunity[]>([])

  const [oppStage, setOppStage] = useState(STAGE_OPTIONS[0])
  const [oppAmount, setOppAmount] = useState('')
  const [oppError, setOppError] = useState('')

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
      <TableOpportunities opportunities={opportunities} />

      {selectedLead ? (
        <SlideOverPanel
          oppStage={oppStage}
          setOppStage={setOppStage}
          oppAmount={oppAmount}
          setOppAmount={setOppAmount}
          oppError={oppError}
          setOppError={setOppError}
          setOpportunities={setOpportunities}
        />
      ) : null}
    </div>
  )
}
