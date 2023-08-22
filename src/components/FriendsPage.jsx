import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import AddFriendPage from './FriendsPageComponents/AddFriendPage'
import FriendRequestsPage from './FriendRequestsPage/FriendRequestsPage'

const FriendsPage = () => {
  const [friends, setFriends] = useState([])
  const [content, setContent] = useState('friends')
  const [reqCount, setReqCount] = useState(0)
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
    axios
      .post('/api/friends/get', { type: 'count' })
      .then(({ data }) => setReqCount(data))
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
            setContent('friends')
          }}
        >
          Friends
        </button>
        <button
          onClick={() => {
            setContent('adding')
          }}
        >
          Add Friend
        </button>
        <button
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => {
            setContent('requests')
          }}
        >
          <div
            style={
              reqCount > 0
                ? {
                    color: 'red',
                    border: '2px solid red',
                    borderRadius: 10,
                    width: 15,
                    height: 15,
                    position: 'absolute',
                    marginBottom: 25,
                  }
                : {}
            }
          >
            {reqCount > 0 ? reqCount : undefined}
          </div>
          Requests
        </button>
      </div>
      <h1 style={{ color: 'red' }}>
        {error.length > 0 ? `Error: ${error}` : undefined}
      </h1>
      <div className='users-container'>
        {content === 'adding' ? (
          <AddFriendPage />
        ) : content === 'friends' ? (
          arr
        ) : (
          <FriendRequestsPage />
        )}
      </div>
    </>
  )
}

export default FriendsPage
