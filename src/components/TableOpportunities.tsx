import type { Opportunity } from '../types'

type TableOpportunitiesProps = {
  opportunities: Opportunity[]
}

export const TableOpportunities = ({
  opportunities,
}: TableOpportunitiesProps) => {
  const emptyList = opportunities.length === 0

  return (
    <div className='mt-8'>
      <h2 className='text-xl font-bold mb-4'>Opportunities</h2>
      {emptyList ? (
        <div className='text-gray-500'>No opportunities yet.</div>
      ) : (
        <table className='min-w-full border'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='p-2 border'>Name</th>
              <th className='p-2 border'>Stage</th>
              <th className='p-2 border'>Amount</th>
              <th className='p-2 border'>Account Name</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opp) => (
              <tr key={opp.id}>
                <td className='p-2 border'>{opp.name}</td>
                <td className='p-2 border'>{opp.stage}</td>
                <td className='p-2 border'>
                  {opp.amount !== undefined ? `$${opp.amount}` : '-'}
                </td>
                <td className='p-2 border'>{opp.accountName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
