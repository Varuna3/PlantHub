import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import NewPlantButton from './HeaderComponents/NewPlantButton'
import ProfileButton from './HeaderComponents/ProfileButton'
import AdminButton from '../AdminPageComponents/AdminButton'
import SaveButton from './HeaderComponents/SaveButton'
import EditAccount from './HeaderComponents/EditAccount'

interface props {
  user: any
  counts: any[]
  setLoggedIn: Function
  hasEdited: boolean
  setHasEdited: Function
}

const HomePageHeader: React.FC<props> = ({
  user,
  counts,
  setLoggedIn,
  hasEdited,
  setHasEdited,
}) => {
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    axios.post('/api/Aiur').then(({ data }) => {
      setAdmin(data)
    })
  }, [])

  const nav = useNavigate()

  return (
    <div style={{ border: '2px solid green', display: 'flex' }}>
      <NewPlantButton></NewPlantButton>
      {admin ? <AdminButton /> : <></>}
      {hasEdited ? (
        <SaveButton counts={counts} setHasEdited={setHasEdited} />
      ) : (
        <></>
      )}
      <EditAccount />
      <ProfileButton user={user} />
      <button
        onClick={() => {
          nav('/Friends')
        }}
      >
        Friends
      </button>
      <button
        onClick={async () => {
          await axios.post('/api/logout')
          setLoggedIn(false)
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default HomePageHeader
