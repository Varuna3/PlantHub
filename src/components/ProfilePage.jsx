import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import HomePageHeader from './HomePageComponents/HomePageHeader'

const ProfilePage = () => {
  const [user, setUser] = useState([])
  const [plants, setPlants] = useState([])

  const nav = useNavigate()

  useEffect(() => {
    axios.post('/api/users').then(({ data }) => {
      setUser(data)
      if (data.plants) {
        setPlants([...data.plants])
      }
    })
    axios.post('/api/hellothere').then(({ data }) => {
      if (data.Youare !== 'goodtogo') nav('/')
    })
  }, [])

  let arr = undefined
  if (plants.length > 0) {
    arr = plants.map(e => {
      return (
        <div key={e.id} className='test-card'>
          <p>Name: {e.name}</p>
          <p>Count: {e.count.count}</p>
          <p>Type: {e.type}</p>
          <img className='PlantImage' src={e.imageURL}></img>
        </div>
      )
    })
  } else {
    arr = 'No plants yet!'
  }
  return (
    <>
      <HomePageHeader user={user}></HomePageHeader>
      <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>{arr}</div>
    </>
  )
}

export default ProfilePage
