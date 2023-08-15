import SearchButton from './SearchButton'
import { useState } from 'react'
import HomeButton from './HomeButton'

const SearchBar = ({ plants, setPlants }) => {
  const [query, setQuery] = useState('')

  return (
    <>
      <form>
        <input
          type='text'
          value={query}
          onChange={e => {
            setQuery(e.target.value)
          }}
        />
        <SearchButton query={query} setPlants={setPlants} />
        <HomeButton />
      </form>
    </>
  )
}

export default SearchBar
