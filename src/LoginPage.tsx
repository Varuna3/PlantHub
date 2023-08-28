import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

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
    <div id='login-page'>
      <ToastContainer
        position='top-center'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='colored'
      />
      <div id='login-greeting' className='round'>
        <h1>Welcome to The Grove.</h1>
        <Link to='./SignUp'>
          <button className='round form-button'>Sign Up</button>
        </Link>
      </div>
      <div
        id='login-container'
        className='round-container'
        style={
          authFailed
            ? { border: '2px solid #d52941' }
            : { border: '2px solid green' }
        }
      >
        <form
          id='login-form'
          autoComplete='off'
          onSubmit={async e => {
            e.preventDefault()
            let res: any = ''
            try {
              res = await axios.post('/api/login', { uname, password })
            } catch {
              toast.error('Authentication Failed', {
                style: { background: '#d52941' },
              })
              setAuthFailed(true)
              setTimeout(() => setAuthFailed(false), 3300)
            }
            if (res.data && res.data.success === true) {
              setAuthFailed(false)
              console.log({ poweroverwhelming: res.data.poweroverwhelming })
              nav('/Profile')
            } else {
              setAuthFailed(true)
            }
          }}
        >
          <Username uname={uname} setUname={setUname} />
          <Password password={password} setPassword={setPassword} />
          <SignIn />
        </form>
      </div>
      <div id='mobile-footer-margin'></div>
    </div>
  )
}

export default LoginPage
