import { useState, useEffect } from 'react'
import axios from 'axios'

import ApproveButton from './ApproveButton'
import DeniedButton from './DeniedButton'
import React from 'react'

interface props {
  id: number
  name: string
  type: string
  imageURL: string
}

const RequestCard: React.FC<props> = ({ id, name, type, imageURL }) => {
  const [status, setStatus] = useState('pending')
  const [color, setColor] = useState('rgb(215, 255, 230)')

  async function approve({ id, name, type, imageURL }: props) {
    await axios.post('/api/Aiur/approve', { id, name, type, imageURL })
  }

  useEffect(() => {
    if (status === 'Approved') {
      axios.post('/api/Aiur/approve', { id, name, type, imageURL })
    } else if (status === 'Denied') {
      axios.post('/api/Aiur/deny', { id, name, type, imageURL })
      setColor('rgb(255, 215, 215)')
    }
  }, [status])

  return status === 'Approved' ? (
    <div
      className='round-container plant-request-card'
      style={{ border: '2px solid #1c7c54', backgroundColor: color }}
    >
      <p>Approved</p>
    </div>
  ) : status === 'Denied' ? (
    <div
      className='round-container plant-request-card'
      style={{ border: '2px solid red', backgroundColor: color }}
    >
      <p>Denied</p>
    </div>
  ) : (
    <div
      className='round-container plant-request-card'
      style={{ border: '2px solid #1c7c54', backgroundColor: color }}
    >
      <h1>{name}</h1>
      <h2>{type}</h2>
      <img className='round-container' src={`${imageURL}`} />
      <div>
        <DeniedButton setStatus={setStatus} />
        <ApproveButton setStatus={setStatus} />
      </div>
    </div>
  )
}

export default RequestCard
