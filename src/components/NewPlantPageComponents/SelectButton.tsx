import axios from 'axios'
import { useState } from 'react'

interface props {
  plant: any
  setSelectedPlant: Function
}

const SelectButton: React.FC<props> = ({ setSelectedPlant, plant }) => {
  return (
    <>
      <button
        className='round form-button'
        onMouseUp={() => {
          setSelectedPlant(plant)
        }}
      >
        Select
      </button>
    </>
  )
}

export default SelectButton
