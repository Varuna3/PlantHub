import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import Header from './VisitPageComponents/Header.jsx'

import PlantCard from './PlantCardComponents/PlantCard.jsx'

const VisitFriendPage = () => {
  const [myImageURL, setMyImageURL] = useState('')
  const [user, setUser] = useState({})
  const [plants, setPlants] = useState([])
  const [counts, setCounts] = useState([])

  const { uname } = useParams()

  useEffect(() => {
    axios.get(`/api/users/${uname}`).then(({ data }) => {
      setUser(data)
      setPlants([...data.plants])
      const tmp = {}
      data.plants.forEach(e => {
        tmp[`${e.name}`] = Number(e.count.count)
      })
      setCounts({ ...tmp })
      console.log(tmp)
    })
    axios.post('/api/users').then(({ data }) => {
      setMyImageURL(data.imageURL)
    })
  }, [])

  const arr = plants.map(e => {
    // console.log(e)
    return (
      <PlantCard
        key={e.id}
        name={e.name}
        type={e.type}
        img={e.imageURL}
        counts={counts}
      />
    )
  })

  return (
    <div>
      <Header
        uname={uname}
        fname={user.fname}
        lname={user.lname}
        imageURL={user.imageURL}
        myImageURL={myImageURL}
      />
      <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>{arr}</div>
    </div>
  )
}

export default VisitFriendPage
