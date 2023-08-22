import axios from 'axios'
import { useState } from 'react'

const RequestCard = ({ e, reqs, setReqs }) => {
  const [status, setStatus] = useState('pending')

  if (status === 'pending') {
    return (
      <div className='user-card'>
        <h1>{e.uname}</h1>
        <p>
          {e.fname} {e.lname}
        </p>
        <img src={e.imageURL} alt='' />
        <div>
          <button
            style={{ width: 50, height: 50, backgroundColor: 'green' }}
            onClick={async () => {
              setStatus('approved')
              setReqs(reqs - 1)
              await axios.post('/api/friends/requests/approve', {
                userId: e.id,
              })
            }}
          ></button>
          <button
            style={{ width: 50, height: 50, backgroundColor: 'red' }}
            onClick={async () => {
              setStatus('denied')
              setReqs(reqs - 1)
              await axios.post('/api/friends/requests/deny', { userId: e.id })
            }}
          ></button>
        </div>
      </div>
    )
  } else if (status === 'approved') {
    return (
      <div
        className='user-card'
        style={{ backgroundColor: 'rgb(215, 255, 230)' }}
      >
        <p style={{ color: 'green' }}>Approved</p>
      </div>
    )
  } else if (status === 'denied') {
    return (
      <div
        className='user-card'
        style={{ backgroundColor: 'rgb(255, 215, 215)' }}
      >
        <p style={{ color: 'red' }}>Denied</p>
      </div>
    )
  }
}

export default RequestCard