import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'

import HomePageHeader from './HomePageComponents/HomePageHeader'
import PlantCard from './PlantCardComponents/PlantCard'

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState([])
  const [plants, setPlants]: [any[], Function] = useState([])
  const [counts, setCounts] = useState([])
  const [loggedIn, setLoggedIn] = useState(true)
  const [hasEdited, setHasEdited] = useState(false)

  const nav = useNavigate()

  useEffect(() => {
    axios.post('/api/hellothere').then(({ data }) => {
      if (data.Youare !== 'goodtogo' || loggedIn === false) nav('/')
    })
    axios.post('/api/users').then(({ data }) => {
      setUser(data)
      if (data.plants) {
        setPlants([...data.plants])
        const tmp: any = {}
        data.plants.forEach((e: any) => {
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
  function increment(name: string) {
    setHasEdited(true)
    const tmp: any = { ...counts }
    tmp[`${name}`]++
    setCounts({ ...tmp })
  }
  function decrement(name: string) {
    setHasEdited(true)
    const tmp: any = { ...counts }
    tmp[`${name}`]--
    setCounts({ ...tmp })
  }
  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='colored'
      />
      <HomePageHeader
        user={user}
        counts={counts}
        setLoggedIn={setLoggedIn}
        hasEdited={hasEdited}
        setHasEdited={setHasEdited}
      ></HomePageHeader>
      <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>{arr}</div>
    </>
  )
}

export default ProfilePage
