import { useLeadsContext } from '../context/LeadsContext'

export const Search = () => {
  const { search, setSearch } = useLeadsContext()

  return (
    <div className='w-full sm:w-56'>
      <label className='mr-2 font-medium'>Search for leads:</label>
      <input
        type='text'
        placeholder='Search leads...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='px-4 py-2 rounded-xl shadow bg-white border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 w-full sm:w-56 transition-all duration-200'
      />
    </div>
  )
}
