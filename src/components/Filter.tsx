import { useLeadsContext } from '../context/LeadsContext'
import { STATUS_OPTIONS } from '../utils/consts'

export const Filter = () => {
  const { statusFilter, setStatusFilter } = useLeadsContext()

  return (
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className='border px-2 py-1 rounded'
    >
      <option value=''>All Status</option>
      {STATUS_OPTIONS.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  )
}
