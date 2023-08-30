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

  async function approve({ id, name, type, imageURL }: props) {
    await axios.post('/api/Aiur/approve', { id, name, type, imageURL })
  }

  useEffect(() => {
    if (status === 'Approved') {
      axios.post('/api/Aiur/approve', { id, name, type, imageURL })
    } else if (status === 'Denied') {
      axios.post('/api/Aiur/deny', { id, name, type, imageURL })
    }
  }, [status])

  return status === 'Approved' ? (
    <div style={{ border: '2px solid #1c7c54' }}>
      <p>Approved</p>
    </div>
  ) : status === 'Denied' ? (
    <div style={{ border: '2px solid red' }}>
      <p>Denied</p>
    </div>
  ) : (
    <div style={{ border: '2px solid #1c7c54' }}>
      <p>{name}</p>
      <p>{type}</p>
      <img src={`${imageURL}`} />
      <ApproveButton setStatus={setStatus} />
      <DeniedButton setStatus={setStatus} />
    </div>
  )
}

export default RequestCard
