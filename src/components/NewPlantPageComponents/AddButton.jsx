import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const AddButton = ({ selectedPlant }) => {
  const [error, setError] = useState(false)

  const nav = useNavigate()

  return (
    <>
      <button
        // className='test-box'
        style={{
          width: '100px',
          height: '50px',
          backgroundColor: error ? 'red' : '',
        }}
        onClick={async () => {
          if (selectedPlant.length > 0) {
            const res = await axios.post('/api/users/newplant', {
              name: selectedPlant,
            })
            if (res.data.success) {
              nav('/Profile')
            } else {
              setError(true)
            }
          }
        }}
      >
        Add Plant To Profile
      </button>
    </>
  )
}

export default AddButton
