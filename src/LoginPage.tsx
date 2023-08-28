import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

import Username from './components/FormComponents/Username.tsx'
import Password from './components/FormComponents/Password.tsx'
import SignIn from './components/FormComponents/SignIn.tsx'

const LoginPage: React.FC = () => {
  const [uname, setUname] = useState('')
  const [password, setPassword] = useState('')
  const [authFailed, setAuthFailed] = useState(false)

  const nav = useNavigate()

  useEffect(() => {
    axios.post('/api/hellothere').then(({ data }) => {
      if (data.Youare === 'goodtogo') nav('/Profile')
    })
  }, [])

  return (
    <div id='LoginPage'>
      <form
        onSubmit={async e => {
          e.preventDefault()
          let res: any = ''
          try {
            res = await axios.post('/api/login', { uname, password })
          } catch {
            setAuthFailed(true)
          }
          if (res.data && res.data.success === true) {
            setAuthFailed(false)
            console.log({ poweroverwhelming: res.data.poweroverwhelming })
            nav('/Profile')
          } else {
            setAuthFailed(true)
          }
        }}
        style={{
          border: authFailed ? 'solid red 2px' : undefined,
        }}
      >
        <Username uname={uname} setUname={setUname} />
        <Password password={password} setPassword={setPassword} />
        <p>{authFailed ? `Error: Auth failed` : ''}</p>
        <SignIn />
      </form>
      <Link to='./SignUp'>
        <button>Sign Up</button>
      </Link>
    </div>
  )
}

export default LoginPage
