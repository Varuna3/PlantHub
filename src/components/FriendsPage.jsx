import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import AddFriendPage from './FriendsPageComponents/AddFriendPage'

const FriendsPage = () => {
  const [friends, setFriends] = useState([])
  const [addingFriend, setAddingFriend] = useState(false)
  const [error, setError] = useState('')

  const nav = useNavigate()

  useEffect(() => {
    axios.post('/api/hellothere').then(({ data }) => {
      if (data.Youare !== 'goodtogo') nav('/')
    })
    axios.post('/api/friends/get', { type: 'approved' }).then(({ data }) => {
      if (!data.Error) {
        setFriends([...data])
      } else {
        setError(data.Error)
      }
    })
  }, [])

  const arr = friends.map(e => {
    return (
      <div key={e.id} className='user-card'>
        <h1>{e.uname}</h1>
        <p>
          {e.fname} {e.lname}
        </p>
        <img src={e.imageURL} alt='' />
      </div>
    )
  })

  return (
    <>
      <div style={{ display: 'flex' }}>
        <button
          onClick={() => {
            nav('/')
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            setAddingFriend(!addingFriend)
          }}
        >
          {addingFriend ? 'Friends' : 'Add Friend'}
        </button>
        <button>Requests</button>
      </div>
      <h1 style={{ color: 'red' }}>
        {error.length > 0 ? `Error: ${error}` : undefined}
      </h1>
      <div className='friends-container'>
        {addingFriend ? <AddFriendPage /> : arr}
      </div>
    </>
  )
}

export default FriendsPage
