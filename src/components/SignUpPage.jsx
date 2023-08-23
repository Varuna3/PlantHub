import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import FirstName from './FormComponents/FirstName.jsx'
import Username from './FormComponents/Username.jsx'
import Password from './FormComponents/Password.jsx'
import LastName from './FormComponents/LastName.jsx'
import ProfilePictureURL from './FormComponents/ProfilePictureURL.jsx'
import CreateUser from './FormComponents/CreateUser.jsx'
import ErrorMessage from './FormComponents/ErrorMessage.jsx'

const SignUpPage = () => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [uname, setUname] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const nav = useNavigate()

  return (
    <>
      <form
        id='SignUpPage'
        style={{ border: error ? '2px solid red' : '2px solid green' }}
        onSubmit={async e => {
          e.preventDefault()
          const { data } = await axios.post('/api/users/create', {
            fname,
            lname,
            imageURL,
            uname,
            password,
          })
          if (data.Error) {
            setError(true)
            switch (data.Error) {
              case 'null values':
                setMessage('Please fill out all fields.')
                break
              case 'password':
                setMessage('Please enter a password longer than 8 characters.')
                break
              case 'unique uname':
                setMessage('Username is already taken.')
                break
            }
          } else {
            nav('/')
          }
        }}
      >
        <FirstName fname={fname} setFname={setFname} />
        <LastName lname={lname} setLname={setLname} />
        <ProfilePictureURL imageURL={imageURL} setImageURL={setImageURL} />
        <Username uname={uname} setUname={setUname} />
        <Password pasword={password} setPassword={setPassword} />
        <ErrorMessage error={error} message={message} />
        <CreateUser />
      </form>
    </>
  )
}

export default SignUpPage
