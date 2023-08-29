import PlusButton from './PlusButton'
import MinusButton from './MinusButton'
import axios from 'axios'
import { ReactElement, useState } from 'react'

interface props {
  name: string
  counts: any[]
  type: string
  img: string
  increment: Function
  decrement: Function
}

const PlantCard: React.FC<props> = ({
  name,
  counts,
  type,
  img,
  increment,
  decrement,
}) => {
  if (increment) {
    //@ts-ignore
    let count = counts[`${name}`]
    const [status, setStatus] = useState('alive')

    if (status === 'alive')
      return (
        <div
          className='round-container plant-card'
          style={{ backgroundColor: 'rgb(215, 255, 230)' }}
        >
          <div className='plant-title-type-wrapper'>
            <h1>{name}</h1>
            <h2>{type}</h2>
          </div>
          <img className='round-container' src={`${img}`} />
          <p>{count}</p>
          <div className='count-button-wrapper'>
            <PlusButton name={name} increment={increment} />
            <MinusButton name={name} decrement={decrement} />
          </div>
          <button
            className='round plant-delete-button'
            onClick={async () => {
              await axios.post('/api/count/delete', { name })
              setStatus('dead')
            }}
          >
            Delete
          </button>
        </div>
      )
    else
      return (
        <div
          className='round-container plant-card'
          style={{ backgroundColor: 'rgb(255, 215, 215)' }}
        >
          <h1>Deleted</h1>
          <p>{status}</p>
          <button
            className='round plant-delete-button'
            onClick={async () => {
              await axios.post('/api/users/newplant', { name, count })
              setStatus('alive')
            }}
          >
            undo
          </button>
        </div>
      )
  } else {
    if (counts) {
      //@ts-ignore
      let count = counts[`${name}`]
      const [status, setStatus] = useState('alive')

      if (status === 'alive')
        return (
          <div
            className='round-container plant-card'
            style={{ backgroundColor: 'rgb(215, 255, 230)' }}
          >
            <div className='plant-title-type-wrapper'>
              <h1>{name}</h1>
              <h2>{type}</h2>
            </div>
            <img className='PlantImage' src={`${img}`} />
            <p>{count}</p>
          </div>
        )
      else
        return (
          <div
            className='round-container plant-card'
            style={{ backgroundColor: 'rgb(255, 215, 215)' }}
          >
            <h1>Deleted</h1>
            <p>{status}</p>
            <button
              onClick={async () => {
                await axios.post('/api/users/newplant', { name, count })
                setStatus('alive')
              }}
            >
              undo
            </button>
          </div>
        )
    }
  }
}

export default PlantCard
