import { useState, useEffect } from 'react'

import axios from 'axios'

import SelectButton from './SelectButton'

interface props {
  plantName: string
  imageURL: string
  selectedPlant: any
  setSelectedPlant: any
}

const PlantRow: React.FC<props> = ({
  plantName,
  imageURL,
  selectedPlant,
  setSelectedPlant,
}) => {
  const [selected, setSelected] = useState(false)

  return (
    <div
      className='round-container plant-card'
      style={
        selectedPlant === plantName
          ? { border: '10px solid #1c7c54' }
          : { border: '2px solid #1b512d' }
      }
    >
      <h1>{`${plantName}`}</h1>
      <img className='round-container card-image' src={`${imageURL}`} />
      <SelectButton setSelectedPlant={setSelectedPlant} plant={plantName} />
    </div>
  )
}

export default PlantRow
