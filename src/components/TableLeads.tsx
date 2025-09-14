import { useState } from 'react'

import { useLeadEditorContext } from '../context/LeadEditorContext'
import { useLeadsContext } from '../context/LeadsContext'

export const TableLeads = () => {
  const { filteredLeads, loading, error } = useLeadsContext()
  const { openLeadPanel } = useLeadEditorContext()

  const [page, setPage] = useState(1)
  const pageSize = 10
  const totalPages = Math.ceil(filteredLeads.length / pageSize)
  const paginatedLeads = filteredLeads.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  const emptyList = filteredLeads.length === 0

  if (loading) {
    return <div>Loading leads...</div>
  }

  if (emptyList) {
    return <div>No leads found.</div>
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>
  }

  return (
    <>
      <div className='w-full overflow-x-auto'>
        <table className='min-w-full border table-fixed'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='p-2 border w-[80px] min-w-[60px]'>ID</th>
              <th className='p-2 border w-[160px] min-w-[120px]'>Name</th>
              <th className='p-2 border w-[160px] min-w-[120px]'>Company</th>
              <th className='p-2 border w-[220px] min-w-[180px]'>Email</th>
              <th className='p-2 border w-[120px] min-w-[100px]'>Source</th>
              <th className='p-2 border w-[100px] min-w-[80px]'>Score</th>
              <th className='p-2 border w-[120px] min-w-[100px]'>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeads.map((lead) => (
              <tr
                key={lead.id}
                className='hover:bg-gray-50 cursor-pointer'
                onClick={() => openLeadPanel(lead)}
              >
                <td className='p-2 border'>{lead.id}</td>
                <td className='p-2 border truncate whitespace-nowrap overflow-hidden'>{lead.name}</td>
                <td className='p-2 border truncate whitespace-nowrap overflow-hidden'>{lead.company}</td>
                <td className='p-2 border truncate whitespace-nowrap overflow-hidden'>{lead.email}</td>
                <td className='p-2 border'>{lead.source}</td>
                <td className='p-2 border'>{lead.score}</td>
                <td className='p-2 border'>{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex justify-center items-center gap-2 mt-4 '>
        <button
          className='px-3 py-1 rounded border bg-gray-100 disabled:opacity-50'
          onClick={() => setPage((prevState) => Math.max(1, prevState - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className='px-3 py-1 rounded border bg-gray-100 disabled:opacity-50'
          onClick={() =>
            setPage((prevState) => Math.min(totalPages, prevState + 1))
          }
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  )
}
