import axios from 'axios'
import { useEffect } from 'react'

interface props {
  query: any
  setPlants: Function
}

const SearchButton: React.FC<props> = ({ query, setPlants }) => {
  useEffect(() => {
    getPlants()
  }, [])

  const getPlants = async () => {
    if (query.length > 0) {
      const { data } = await axios.get(
        `/api/plantsByName/${query.toLowerCase()}`
      ) // <-- will eventually be a parameter, using "Pine" for now.
      setPlants(data)
    } else {
      const { data } = await axios.get('/api/plants')
      setPlants(data)
    }
  }

  return (
    <>
      <button
        className='round'
        onClick={async e => {
          e.preventDefault()
          getPlants()
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
