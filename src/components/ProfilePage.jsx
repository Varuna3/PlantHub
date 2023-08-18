import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import HomePageHeader from './HomePageComponents/HomePageHeader'
import PlantCard from './PlantCardComponents/PlantCard'

const ProfilePage = () => {
  const [user, setUser] = useState([])
  const [plants, setPlants] = useState([])
  const [counts, setCounts] = useState([])
  const [loggedIn, setLoggedIn] = useState(true)

  const nav = useNavigate()

  useEffect(() => {
    axios.post('/api/hellothere').then(({ data }) => {
      if (data.Youare !== 'goodtogo' || loggedIn === false) nav('/')
    })
    axios.post('/api/users').then(({ data }) => {
      console.log(data)
      setUser(data)
      if (data.plants) {
        setPlants([...data.plants])
        const tmp = {}
        data.plants.forEach(e => {
          tmp[`${e.name}`] = Number(e.count.count)
        })
        setCounts({ ...tmp })
      }
    })
  }, [loggedIn])
  let arr = undefined
  if (plants.length > 0) {
    arr = plants.map(e => {
      return (
        <PlantCard
          key={e.id}
          name={e.name}
          counts={counts}
          type={e.type}
          img={e.imageURL}
          increment={increment}
          decrement={decrement}
        />
      )
    })
  } else {
    arr = 'No plants yet!'
  }
  function increment(name) {
    const tmp = { ...counts }
    tmp[`${name}`]++
    setCounts({ ...tmp })
  }
  function decrement(name) {
    const tmp = { ...counts }
    tmp[`${name}`]--
    setCounts({ ...tmp })
  }
  return (
    <>
      <HomePageHeader
        user={user}
        counts={counts}
        setLoggedIn={setLoggedIn}
      ></HomePageHeader>
      <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>{arr}</div>
    </>
  )
}

export default ProfilePage
