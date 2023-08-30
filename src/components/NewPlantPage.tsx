import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SearchBar from './NewPlantPageComponents/SearchBar'
import PlantRowContainer from './NewPlantPageComponents/PlantRowContainer'

const NewPlantPage: React.FC = () => {
  const [plants, setPlants] = useState([])

  const nav = useNavigate()

  useEffect(() => {
    axios.post('/api/hellothere').then(({ data }) => {
      if (data.Youare !== 'goodtogo') nav('/')
    })
  }, [])

  return (
    <>
      <div className='newplant-page'>
        <SearchBar plants={plants} setPlants={setPlants} />
        <PlantRowContainer plants={plants} setPlants={setPlants} />
      </div>
    </>
  )
}

export default NewPlantPage
