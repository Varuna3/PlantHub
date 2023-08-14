import { useState } from 'react'

import FirstName from './FormComponents/FirstName.jsx'
import Username from './FormComponents/Username.jsx'
import Password from './FormComponents/Password.jsx'
import LastName from './FormComponents/LastName.jsx'
import ProfilePictureURL from './FormComponents/ProfilePictureURL.jsx'

const SignUpPage = () => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [uname, setUname] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form id='SignUpPage'>
      <FirstName fname={fname} setFname={setFname} />
      <LastName lname={lname} setLname={setLname} />
      <ProfilePictureURL imageURL={imageURL} setImageURL={setImageURL} />
      <Username uname={uname} setUname={setUname} />
      <Password pasword={password} setPassword={setPassword} />
      <button>Create User</button>
    </form>
  )
}

export default SignUpPage
