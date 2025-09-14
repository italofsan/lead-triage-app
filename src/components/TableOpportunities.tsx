import { useOpportunitiesContext } from '../context/OpportunitiesContext'

export const TableOpportunities = () => {
  const { opportunities } = useOpportunitiesContext()

  const emptyList = opportunities.length === 0

  return (
    <div className='mt-8'>
      <h2 className='text-xl font-bold mb-4'>Opportunities</h2>
      {emptyList ? (
        <div className='text-gray-500'>No opportunities yet.</div>
      ) : (
        <table className='min-w-full table-fixed rounded-xl shadow-lg overflow-hidden'>
          <thead>
            <tr className='bg-gray-100 rounded-t-xl'>
              <th className='p-2 w-[160px] min-w-[120px]'>Name</th>
              <th className='p-2 w-[120px] min-w-[100px]'>Stage</th>
              <th className='p-2 w-[120px] min-w-[100px]'>Amount</th>
              <th className='p-2 w-[200px] min-w-[140px]'>Account Name</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opp) => (
              <tr
                key={opp.id}
                className='rounded-lg transition-colors hover:bg-gray-50'
              >
                <td className='p-2'>{opp.name}</td>
                <td className='p-2'>{opp.stage}</td>
                <td className='p-2'>
                  {opp.amount !== undefined ? `$${opp.amount}` : '-'}
                </td>
                <td className='p-2'>{opp.accountName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
