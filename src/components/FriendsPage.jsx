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
    axios.post('/api/friends/get').then(({ data }) => {
      setFriendIds([...data])
    })
  }, [])

  return (
    <>
      <div className='test-box'></div>
    </>
  )
}

export default FriendsPage
