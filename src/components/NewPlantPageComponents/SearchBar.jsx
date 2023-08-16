import SearchButton from './SearchButton'
import { useState } from 'react'
import HomeButton from './HomeButton'
import PlantRequestButton from './PlantRequestButton'

const SearchBar = ({ plants, setPlants }) => {
  const [query, setQuery] = useState('')

  return (
    <div id='searchBar'>
      <form>
        <input
          type='text'
          value={query}
          onChange={e => {
            setQuery(e.target.value)
          }}
        />
        <SearchButton query={query} setPlants={setPlants} />
      </form>
      <HomeButton />
      <PlantRequestButton />
    </div>
  )
}

export default SearchBar
