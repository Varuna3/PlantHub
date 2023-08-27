import getQuote from '../../../../theImportantStuff.ts'
import { useState, useEffect, ReactElement } from 'react'

import { toast } from 'react-toastify'

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
          toast.info(getQuote())
        }}
      />
    </>
  )
}

export default ProfileButton
