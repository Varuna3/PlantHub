import axios from 'axios'
import { useEffect } from 'react'

const SearchButton = ({ query, setPlants }) => {
  useEffect(() => {
    getPlants()
  }, [])

  const getPlants = async () => {
    if (query.length > 0) {
      const { data } = await axios.get(`/api/plantsByName/${query}`) // <-- will eventually be a parameter, using "Pine" for now.
      setPlants(data)
    } else {
      const { data } = await axios.get('/api/plants')
      setPlants(data)
    }
  }

  return (
    <>
      <button
        style={{ width: '100px' }}
        onClick={async e => {
          e.preventDefault()
          getPlants(query)
        }}
      >
        <img
          style={{ maxHeight: '50px' }}
          src='https://static.vecteezy.com/system/resources/previews/009/399/532/original/magnifying-glass-clipart-design-illustration-free-png.png'
        />
      </button>
    </>
  )
}

export default SearchButton
