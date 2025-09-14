import type { Lead } from '../types'

type TableLeadsProps = {
  openLeadPanel: (lead: Lead) => void
  filteredLeads: Lead[]
}

export const TableLeads = ({
  filteredLeads,
  openLeadPanel,
}: TableLeadsProps) => {
  return (
    <table className='min-w-full border'>
      <thead>
        <tr className='bg-gray-100'>
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
