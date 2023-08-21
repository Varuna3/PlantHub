import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FriendsPage = () => {
  const [user, setUser] = useState({})
  const [friendIds, setFriendIds] = useState([])

  const nav = useNavigate()

  useEffect(() => {
    axios.post('/api/hellothere').then(({ data }) => {
      if (data.Youare !== 'goodtogo') nav('/')
    })
    axios.post('/api/users/').then(({ data }) => {
      // data.forEach(e => {
      //   for (const key in e) {
      //     setFriendIds([...friendIds, e[key]])
      //   }
      // })
      console.log(data)
    })
  }, [])

  // console.log('aa', friendIds)

  return (
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
  )
}

export default FriendsPage
