import { useLeadEditorContext } from '../context/LeadEditorContext'
import { useLeadsContext } from '../context/LeadsContext'

export const TableLeads = () => {
  const { filteredLeads, loading, error } = useLeadsContext()
  const { openLeadPanel } = useLeadEditorContext()

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
    <table className='min-w-full border'>
      <thead>
        <tr className='bg-gray-100'>
          <th className='p-2 border'>ID</th>
          <th className='p-2 border'>Name</th>
          <th className='p-2 border'>Company</th>
          <th className='p-2 border'>Email</th>
          <th className='p-2 border'>Source</th>
          <th className='p-2 border'>Score</th>
          <th className='p-2 border'>Status</th>
        </tr>
      </thead>
      <tbody>
        {filteredLeads.map((lead) => (
          <tr
            key={lead.id}
            className='hover:bg-gray-50 cursor-pointer'
            onClick={() => openLeadPanel(lead)}
          >
            <td className='p-2 border'>{lead.id}</td>
            <td className='p-2 border'>{lead.name}</td>
            <td className='p-2 border'>{lead.company}</td>
            <td className='p-2 border'>{lead.email}</td>
            <td className='p-2 border'>{lead.source}</td>
            <td className='p-2 border'>{lead.score}</td>
            <td className='p-2 border'>{lead.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
