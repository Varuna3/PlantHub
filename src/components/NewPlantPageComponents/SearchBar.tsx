import SearchButton from './SearchButton'
import { useState } from 'react'
import HomeButton from './HomeButton'
import PlantRequestButton from './PlantRequestButton'

interface props {
  setPlants: Function
}

const SearchBar: React.FC<props> = ({ setPlants }) => {
  const [query, setQuery] = useState('')

  return (
    <div id='search-bar'>
      <div id='newplant-header-container'>
        <HomeButton />
        <PlantRequestButton />
      </div>
      <form className='input-field'>
        <label htmlFor='query'>Search for Plants</label>
        <input
          id='query'
          className='round input-box'
          type='text'
          value={query}
          onChange={e => {
            setQuery(e.target.value)
          }}
        />
        <SearchButton query={query} setPlants={setPlants} />
      </form>
    </div>
  )
}

export default SearchBar
