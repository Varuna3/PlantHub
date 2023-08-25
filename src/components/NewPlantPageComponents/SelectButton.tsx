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
        id='selectButton'
        onMouseUp={() => {
          setSelectedPlant(plant)
        }}
      >
        <p>Select</p>
        <img
          style={{ width: '100px' }}
          src='https://static.vecteezy.com/system/resources/previews/009/376/677/original/plant-in-pot-icon-free-png.png'
        />
      </button>
    </>
  )
}

export default SelectButton
