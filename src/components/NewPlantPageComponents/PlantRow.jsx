import { useState, useEffect } from 'react'

import axios from 'axios'

import SelectButton from './SelectButton'

const PlantRow = ({ plantName, imageURL, selectedPlant, setSelectedPlant }) => {
  const [selected, setSelected] = useState(false)

  return (
    <div
      className='PlantRow'
      style={
        selectedPlant === plantName
          ? { border: '5px green solid' }
          : { border: '2px purple solid' }
      }
    >
      <img style={{ height: '100px' }} src={`${imageURL}`} />
      <p>{`${plantName}`}</p>
      <SelectButton setSelectedPlant={setSelectedPlant} plant={plantName} />
    </div>
  )
}

export default PlantRow
