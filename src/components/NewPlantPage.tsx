import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SearchBar from './NewPlantPageComponents/SearchBar'
import PlantRowContainer from './NewPlantPageComponents/PlantRowContainer'
import { ToastContainer } from 'react-toastify'

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
      <ToastContainer
        position='top-center'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='colored'
      />
      <div className='newplant-page'>
        <SearchBar setPlants={setPlants} />
        <PlantRowContainer plants={plants} setPlants={setPlants} />
      </div>
    </>
  )
}

export default NewPlantPage
