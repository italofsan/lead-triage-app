import { useLeadsContext } from '../context/LeadsContext'

export const Search = () => {
  const { search, setSearch } = useLeadsContext()

  return (
    <input
      type='text'
      placeholder='Search name/company...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className='border px-2 py-1 rounded'
    />
  )
}
