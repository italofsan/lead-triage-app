import { useLeadsContext } from '../context/LeadsContext'

export const Sort = () => {
  const { sortBy, setSortBy } = useLeadsContext()

  return (
    <div className='w-full sm:w-56'>
      <label className='mr-2 font-medium'>Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as 'id' | 'score')}
        className='px-4 py-2 rounded-xl shadow bg-white border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 w-full transition-all duration-200'
      >
        <option value='id'>ID</option>
        <option value='score'>Score (desc)</option>
      </select>
    </div>
  )
}
