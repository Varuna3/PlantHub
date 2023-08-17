import { useState, useEffect } from 'react'
import axios from 'axios'

import ApproveButton from './ApproveButton'
import DeniedButton from './DeniedButton'

const RequestCard = ({ id, name, type, imageURL }) => {
  const [status, setStatus] = useState('pending')

  async function approve({ id, name, type, imageURL }) {
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
    <div style={{ border: '2px solid green' }}>
      <p>Approved</p>
    </div>
  ) : status === 'Denied' ? (
    <div style={{ border: '2px solid red' }}>
      <p>Denid</p>
    </div>
  ) : (
    // ) : (
    <div style={{ border: '2px solid green' }}>
      <p>{name}</p>
      <p>{type}</p>
      <img src={`${imageURL}`} />
      <ApproveButton setStatus={setStatus} />
      <DeniedButton setStatus={setStatus} />
    </div>
  )
}

export default RequestCard