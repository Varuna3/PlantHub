import { useState, useEffect } from 'react'
import axios from 'axios'

import NewPlantButton from './HeaderComponents/NewPlantButton'
import ProfileButton from './HeaderComponents/ProfileButton'
import AdminButton from '../AdminPageComponents/AdminButton'

const HomePageHeader = ({ user }) => {
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    axios.post('/api/Aiur').then(({ data }) => {
      setAdmin(data)
    })
  }, [])

  return (
    <div style={{ border: '2px solid green' }}>
      <NewPlantButton></NewPlantButton>
      {admin ? <AdminButton /> : <></>}
      <ProfileButton user={user}></ProfileButton>
    </div>
  )
}

export default HomePageHeader
