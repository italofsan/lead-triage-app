import { useLeadsContext } from '../context/LeadsContext'
import { STATUS_OPTIONS } from '../utils/consts'

export const Filter = () => {
  const { statusFilter, setStatusFilter } = useLeadsContext()

  return (
    <div className='w-full sm:w-56'>
      <label className='mr-2 font-medium'>Filter:</label>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className='px-4 py-2 rounded-xl shadow bg-white border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 w-full sm:w-56 transition-all duration-200'
      >
        <option value=''>All Status</option>
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  )
}
