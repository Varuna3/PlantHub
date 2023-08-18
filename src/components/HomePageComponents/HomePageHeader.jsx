import { useState, useEffect } from 'react'
import axios from 'axios'

import NewPlantButton from './HeaderComponents/NewPlantButton'
import ProfileButton from './HeaderComponents/ProfileButton'
import AdminButton from '../AdminPageComponents/AdminButton'
import SaveButton from './HeaderComponents/SaveButton'
import EditAccount from './HeaderComponents/EditAccount'

const HomePageHeader = ({ user, counts }) => {
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    axios.post('/api/Aiur').then(({ data }) => {
      setAdmin(data)
    })
  }, [])

  return (
    <div style={{ border: '2px solid green', display: 'flex' }}>
      <NewPlantButton></NewPlantButton>
      {admin ? <AdminButton /> : <></>}
      <SaveButton counts={counts} />
      {/* <EditAccount /> */}
      <ProfileButton user={user}></ProfileButton>
    </div>
  )
}

export default HomePageHeader
