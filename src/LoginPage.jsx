import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Username from './components/FormComponents/Username.jsx'
import Password from './components/FormComponents/Password.jsx'
import SignIn from './components/FormComponents/SignIn.jsx'

const LoginPage = () => {
  const [uname, setUname] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <form
        action='/'
        onSubmit={async e => {
          e.preventDefault()
          const res = await axios.post('/api/login', { uname, password })
          console.log({ poweroverwhelming: res.data.poweroverwhelming })
        }}
      >
        <Username uname={uname} setUname={setUname} />
        <Password pasword={password} setPassword={setPassword} />
        <SignIn />
      </form>
      <Link to='./SignUp'>SignUp</Link>
    </>
  )
}

export default LoginPage
