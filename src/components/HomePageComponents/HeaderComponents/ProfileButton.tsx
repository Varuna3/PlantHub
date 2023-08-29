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
        className='profile-picture'
        src={url}
        onClick={() => {
          toast.info(getQuote())
        }}
      />
    </>
  )
}

export default ProfileButton
