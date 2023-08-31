import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

interface element {
  id: number
  uname: string
  fname: string
  lname: string
  imageURL: string
}

interface props {
  e: element
  reqCount: number
  setReqCount: Function
}

const RequestCard: React.FC<props> = ({ e, reqCount, setReqCount }) => {
  const [status, setStatus] = useState('pending')

  if (status === 'pending') {
    return (
      <div className='round-container user-card'>
        <h1>{e.uname}</h1>
        <h2>{e.fname}</h2>
        <img src={e.imageURL} alt='' className='round-container card-image' />
        <div className=''>
          <button
            className='round admin-button'
            style={{ backgroundColor: 'green' }}
            onClick={async () => {
              setStatus('approved')
              setReqCount(reqCount - 1)
              await axios.post('/api/friends/requests/approve', {
                userId: e.id,
              })
              toast.success('Success!', { style: { background: '#73e2a7' } })
            }}
          ></button>
          <button
            className='round admin-button'
            style={{ backgroundColor: 'red' }}
            onClick={async () => {
              setStatus('denied')
              setReqCount(reqCount - 1)
              await axios.post('/api/friends/requests/deny', { userId: e.id })
              toast.success('Success!', { style: { background: '#73e2a7' } })
            }}
          ></button>
        </div>
      </div>
    )
  } else if (status === 'approved') {
    return (
      <div
        className='user-card round-container'
        style={{ backgroundColor: 'rgb(215, 255, 230)' }}
      >
        <p style={{ color: 'green' }}>Approved</p>
      </div>
    )
  } else if (status === 'denied') {
    return (
      <div
        className='user-card round-container'
        style={{ backgroundColor: 'rgb(255, 215, 215)' }}
      >
        <p style={{ color: 'red' }}>Denied</p>
      </div>
    )
  }
}

export default RequestCard
