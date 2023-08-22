import axios from 'axios'
import { useEffect, useState } from 'react'
import RequestCard from './RequestCard'

const FriendRequestsPage = () => {
  const [reqs, setReqs] = useState([])

  useEffect(() => {
    axios.post('/api/friends/get', { type: 'pending' }).then(({ data }) => {
      setReqs([...data])
    })
  }, [])

  const arr = reqs.map(e => {
    return <RequestCard e={e} key={e.id} reqs={reqs} setReqs={setReqs} />
  })

  return <div className='users-container'>{arr}</div>
}

export default FriendRequestsPage
