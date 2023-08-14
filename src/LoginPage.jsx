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
    <div id='LoginPage'>
      <form
        action='/'
        onSubmit={async e => {
          e.preventDefault()
          const res = await axios.post('/api/login', { uname, password })
          console.log({ poweroverwhelming: res.data.poweroverwhelming })
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Username uname={uname} setUname={setUname} />
        <Password pasword={password} setPassword={setPassword} />
        <SignIn />
      </form>
      <Link to='./SignUp'>
        <button>Sign Up</button>
      </Link>
    </div>
  )
}

export default LoginPage
