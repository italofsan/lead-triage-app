import { useLeadsContext } from '../context/LeadsContext'

export const Sort = () => {
  const { sortBy, setSortBy } = useLeadsContext()

  return (
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
  )
}
