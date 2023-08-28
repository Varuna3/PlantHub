import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import FirstName from './FormComponents/FirstName.tsx'
import Username from './FormComponents/Username.tsx'
import Password from './FormComponents/Password.tsx'
import LastName from './FormComponents/LastName.tsx'
import ProfilePictureURL from './FormComponents/ProfilePictureURL.tsx'
import CreateUser from './FormComponents/CreateUser.tsx'
import { ToastContainer, toast } from 'react-toastify'

const SignUpPage: React.FC = () => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [uname, setUname] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const nav = useNavigate()

  return (
    <div id='signup-page'>
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
      <form
        id='signup-form'
        className='round-container'
        autoComplete='off'
        style={{ border: error ? '2px solid #d52941' : '2px solid green' }}
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
            setTimeout(() => {
              setError(false)
            }, 3300)
            switch (data.Error) {
              case 'null values':
                toast.error('Please fill out all boxes.', {
                  style: { background: '#d52941' },
                })
                break
              case 'password':
                toast.error('Password must be greater than 8 characters.', {
                  style: { background: '#d52941' },
                })
                break
              case 'unique uname':
                toast.error('Username is already taken.', {
                  style: { background: '#d52941' },
                })
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
        <Password password={password} setPassword={setPassword} />
        <CreateUser />
      </form>
      <div
        style={{
          display: 'flex',
          width: '30vw',
          justifyContent: 'center',
        }}
      >
        <button
          className='round form-button'
          onClick={() => {
            nav('/')
          }}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default SignUpPage
