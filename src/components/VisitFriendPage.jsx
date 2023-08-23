import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import Header from './VisitPageComponents/Header.jsx'

const VisitFriendPage = () => {
  const [user, setUser] = useState({})

  const { uname } = useParams()

  useEffect(() => {
    axios.get(`/api/users/${uname}`).then(({ data }) => {
      setUser(data)
      console.log(data)
    })
  }, [])

  console.log(user)

  return (
    <div>
      <Header
        uname={uname}
        fname={user.fname}
        lname={user.lname}
        imageURL={user.imageURL}
      />
    </div>
  )
}

export default VisitFriendPage
