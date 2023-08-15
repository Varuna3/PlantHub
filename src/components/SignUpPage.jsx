import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import FirstName from './FormComponents/FirstName.jsx'
import Username from './FormComponents/Username.jsx'
import Password from './FormComponents/Password.jsx'
import LastName from './FormComponents/LastName.jsx'
import ProfilePictureURL from './FormComponents/ProfilePictureURL.jsx'
import CreateUser from './FormComponents/CreateUser.jsx'

const SignUpPage = () => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [uname, setUname] = useState('')
  const [password, setPassword] = useState('')

  const nav = useNavigate()

  return (
    <>
      <form
        id='SignUpPage'
        onSubmit={async e => {
          e.preventDefault()
          await axios.post('/api/users/create', {
            fname,
            lname,
            imageURL,
            uname,
            password,
          })
          nav('/')
        }}
      >
        <FirstName fname={fname} setFname={setFname} />
        <LastName lname={lname} setLname={setLname} />
        <ProfilePictureURL imageURL={imageURL} setImageURL={setImageURL} />
        <Username uname={uname} setUname={setUname} />
        <Password pasword={password} setPassword={setPassword} />
        <CreateUser />
      </form>
    </>
  )
}

export default SignUpPage
