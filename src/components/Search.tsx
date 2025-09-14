type SearchProps = {
  search: string
  setSearch: (value: React.SetStateAction<string>) => void
}

export const Search = ({ search, setSearch }: SearchProps) => {
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
