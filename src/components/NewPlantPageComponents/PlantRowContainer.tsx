import { useEffect, useState } from 'react'

import PlantRow from './PlantRow'
import AddButton from './AddButton'

interface props {
  plants: any[]
  setPlants: Function
}

const PlantRowContainer: React.FC<props> = ({ plants, setPlants }) => {
  const [selectedPlant, setSelectedPlant] = useState('')

  const returnPlants = plants.map(e => {
    return (
      <PlantRow
        key={`${e.id}`}
        plantName={`${e.name}`}
        imageURL={`${e.imageURL}`}
        selectedPlant={selectedPlant}
        setSelectedPlant={setSelectedPlant}
      />
    )
  })

  return (
    <div>
      <AddButton selectedPlant={selectedPlant} />
      {returnPlants}
    </div>
  )
}

export default PlantRowContainer
