import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ReactElement, useState } from 'react'
import { Plant } from '../../../scripts/seed'
import { toast } from 'react-toastify'

const AddButton = ({ selectedPlant }: any): ReactElement => {
  const nav = useNavigate()

  return (
    <>
      <button
        className='round form-button'
        onClick={async () => {
          if (selectedPlant.length > 0) {
            const res = await axios.post('/api/users/newplant', {
              name: selectedPlant,
            })
            if (res.data.success) {
              toast.success('Plant successfully added!', {
                style: { background: '#73e2a7' },
              })
            } else {
              toast.error('You already have one of these!', {
                style: { background: '#d52941' },
              })
            }
          } else {
            toast.error('Please select a plant.', {
              style: { background: '#d52941' },
            })
          }
        }}
      >
        Add To Profile
      </button>
    </>
  )
}

export default AddButton
