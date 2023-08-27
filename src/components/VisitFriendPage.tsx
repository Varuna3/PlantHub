import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

import Header from './VisitPageComponents/Header'

import PlantCard from './PlantCardComponents/PlantCard'

const VisitFriendPage: React.FC = () => {
  const [myImageURL, setMyImageURL] = useState('')
  const [user, setUser]: [any, Function] = useState({})
  const [plants, setPlants]: [any[], Function] = useState([])
  const [counts, setCounts] = useState([])

  const { uname } = useParams()

  useEffect(() => {
    axios.get(`/api/users/${uname}`).then(({ data }) => {
      setUser(data)
      setPlants([...data.plants])
      const tmp: any = {}
      data.plants.forEach((e: any) => {
        tmp[`${e.name}`] = Number(e.count.count)
      })
      setCounts({ ...tmp })
    })
    axios.post('/api/users').then(({ data }) => {
      setMyImageURL(data.imageURL)
    })
  }, [])

  const arr = plants.map(e => {
    // console.log(e)
    return (
      //@ts-ignore
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
        uname={user.uname}
        fname={user.fname}
        lname={user.lname}
        imageURL={user.imageURL}
        myImageURL={myImageURL}
      />
      <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>
        {arr.length > 0 ? arr : "This friend doesn't have any plants yet!"}
      </div>
    </div>
  )
}

export default VisitFriendPage
