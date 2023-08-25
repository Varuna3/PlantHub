import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ReactElement, useState } from 'react'
import { Plant } from '../../../scripts/seed'

const AddButton = ({ selectedPlant }: any): ReactElement => {
  const [error, setError] = useState(false)

  const nav = useNavigate()

  return (
    <>
      <button
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
          } else {
            setError(true)
          }
        }}
      >
        Add Plant To Profile
      </button>
    </>
  )
}

export default AddButton
