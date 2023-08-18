import { useState, useEffect } from 'react'

import axios from 'axios'

const ProfileButton = ({ user }) => {
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(user.imageURL)
  }, [user])
  return (
    <>
      <img
        style={{ width: '100px', height: '100px', borderRadius: '100%' }}
        src={url}
        onClick={() => {
          console.log('Ping')
        }}
      />
    </>
  )
}

export default ProfileButton
