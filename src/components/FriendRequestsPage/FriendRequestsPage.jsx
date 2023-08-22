import axios from 'axios'
import { useEffect, useState } from 'react'
import RequestCard from './RequestCard'

const FriendRequestsPage = ({ reqCount, setReqCount }) => {
  const [reqs, setReqs] = useState([])

  useEffect(() => {
    axios.post('/api/friends/get', { type: 'pending' }).then(({ data }) => {
      setReqs([...data])
    })
  }, [])

  let arr = []

  if (reqs.length > 0) {
    arr = reqs.map(e => {
      return (
        <RequestCard
          e={e}
          key={e.id}
          reqCount={reqCount}
          setReqCount={setReqCount}
        />
      )
    })
  }

  return <div className='users-container'>{arr}</div>
}

export default FriendRequestsPage
