import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FriendsPage = () => {
  const [user, setUser] = useState({})
  const [friends, setFriends] = useState([])

  const nav = useNavigate()

  useEffect(() => {
    axios.post('/api/hellothere').then(({ data }) => {
      if (data.Youare !== 'goodtogo') nav('/')
    })
    axios.post('/api/users/').then(({ data }) => {
      let tmp = data.friends.map(e => {
        return (
          <div key={e.id} className='user-card'>
            <h1>{e.uname}</h1>
            <p>{e.fname}</p>
            <p>{e.lname}</p>
            <img src={e.imageURL} />
          </div>
        )
      })
      setFriends(tmp)
    })
  }, [])

  return (
    <>
      <div>
        <button
          onClick={() => {
            nav('/')
          }}
        >
          Home
        </button>
        <button onClick={() => {}}>Add Friend</button>
      </div>
      <div className='friends-container'>{friends}</div>
    </>
  )
}

export default FriendsPage
