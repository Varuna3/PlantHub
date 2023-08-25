import getQuote from '../../../../theImportantStuff.ts'
import { useState, useEffect, ReactElement } from 'react'

import axios from 'axios'

const ProfileButton = ({ user }: any): ReactElement => {
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
          console.log(getQuote())
        }}
      />
    </>
  )
}

export default ProfileButton
