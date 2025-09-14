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
        <table className='min-w-full table-fixed rounded-xl shadow-lg overflow-hidden bg-gray-50 text-xs sm:text-sm'>
          <thead>
            <tr className='rounded-t-xl'>
              <th className='p-1 sm:p-2 w-[60px] sm:w-[80px] min-w-[48px] sm:min-w-[60px] bg-gray-200 text-gray-700 font-semibold'>
                ID
              </th>
              <th className='p-1 sm:p-2 w-[100px] sm:w-[160px] min-w-[80px] sm:min-w-[120px] bg-gray-200 text-gray-700 font-semibold'>
                Name
              </th>
              <th className='p-1 sm:p-2 w-[100px] sm:w-[160px] min-w-[80px] sm:min-w-[120px] bg-gray-200 text-gray-700 font-semibold'>
                Company
              </th>
              <th className='p-1 sm:p-2 w-[140px] sm:w-[220px] min-w-[100px] sm:min-w-[180px] bg-gray-200 text-gray-700 font-semibold'>
                Email
              </th>
              <th className='p-1 sm:p-2 w-[80px] sm:w-[120px] min-w-[60px] sm:min-w-[100px] bg-gray-200 text-gray-700 font-semibold'>
                Source
              </th>
              <th className='p-1 sm:p-2 w-[60px] sm:w-[100px] min-w-[48px] sm:min-w-[80px] bg-gray-200 text-gray-700 font-semibold'>
                Score
              </th>
              <th className='p-1 sm:p-2 w-[80px] sm:w-[120px] min-w-[60px] sm:min-w-[100px] bg-gray-200 text-gray-700 font-semibold'>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeads.map((lead) => (
              <tr
                key={lead.id}
                className='hover:bg-gray-100 cursor-pointer rounded-lg transition-colors border-b border-gray-200 align-middle'
                onClick={() => openLeadPanel(lead)}
              >
                <td className='py-2 px-1 sm:py-4 sm:px-2'>{lead.id}</td>
                <td className='py-2 px-1 sm:py-4 sm:px-2 truncate whitespace-nowrap overflow-hidden'>
                  {lead.name}
                </td>
                <td className='py-2 px-1 sm:py-4 sm:px-2 truncate whitespace-nowrap overflow-hidden'>
                  {lead.company}
                </td>
                <td className='py-2 px-1 sm:py-4 sm:px-2 truncate whitespace-nowrap overflow-hidden'>
                  {lead.email}
                </td>
                <td className='py-2 px-1 sm:py-4 sm:px-2'>{lead.source}</td>
                <td className='py-2 px-1 sm:py-4 sm:px-2'>{lead.score}</td>
                <td className='py-2 px-1 sm:py-4 sm:px-2'>{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  <div className='flex flex-row justify-center items-center gap-2 sm:gap-4 mt-4 sm:mt-6 w-full'>
        <button
          className='px-3 py-2 sm:px-4 sm:py-2 rounded-xl shadow bg-white border border-gray-200 text-gray-700 font-semibold disabled:opacity-50 cursor-pointer disabled:cursor-default transition-all duration-200 hover:bg-gray-100 w-full sm:w-auto sm:flex-none'
          onClick={() => setPage((prevState) => Math.max(1, prevState - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className='px-3 py-2 sm:px-4 sm:py-2 rounded-xl bg-gray-100 text-gray-700 font-medium shadow border border-gray-200 w-full sm:w-auto text-center sm:flex-none'>
          Page {page} of {totalPages}
        </span>
        <button
          className='px-3 py-2 sm:px-4 sm:py-2 rounded-xl shadow bg-white border border-gray-200 text-gray-700 font-semibold disabled:opacity-50 cursor-pointer disabled:cursor-default transition-all duration-200 hover:bg-gray-100 w-full sm:w-auto sm:flex-none'
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
