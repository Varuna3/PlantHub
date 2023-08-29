import { useState } from 'react'

import axios from 'axios'

const EditAccount: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [editItem, setEditItem] = useState('')
  const [value, setValue] = useState('')
  const [oldPass, setOldPass] = useState('')
  const [Errored, setErrored] = useState(false)
  const [Error, setError] = useState('')

  function menu(open: boolean) {
    if (open) {
      return (
        <div
          style={{
            width: '250px',
            height: 'auto',
            border: Errored ? '4px solid red' : '2px solid green',
            background: Errored ? 'rgb(255, 240, 240)' : 'rgb(240, 255, 240)',
          }}
        >
          <p style={{ margin: 0, color: Errored ? 'red' : 'black' }}>
            {Errored ? `${Error}` : 'Select an option.'}
          </p>
          <div style={{ width: '200px', display: 'flex' }}>
            <button
              className='menuButton'
              onClick={() => {
                setValue('')
                setEditItem('Username')
              }}
            >
              Username
            </button>
            <button
              className='menuButton'
              onClick={() => {
                setValue('')
                setEditItem('Password')
              }}
            >
              Password
            </button>
            <button
              className='menuButton'
              onClick={() => {
                setValue('')
                setEditItem('ImageURL')
              }}
            >
              Picture
            </button>
          </div>
          {textBox(editItem)}
        </div>
      )
    } else {
      return <div>{open}</div>
    }
  }

  function textBox(option: string) {
    if (option.length > 0) {
      return (
        <form autoComplete='off'>
          {option === 'Password' ? oldPassword() : <></>}
          <label htmlFor={`${option}`}>{`New ${option}:`}</label>
          <input
            id={`${option}`}
            type='text'
            value={value}
            onChange={e => {
              setValue(e.target.value)
            }}
          />
          <button
            style={{ width: 65, height: 20 }}
            onClick={async e => {
              e.preventDefault()
              switch (option) {
                case 'Username': {
                  const { data } = await axios.post(
                    '/api/users/update/username',
                    { newUsername: value }
                  )
                  if (data.Error) {
                    setErrored(true)
                    setError(data.Error)
                  } else {
                    setOpen(false)
                  }
                  break
                }
                case 'Password': {
                  const { data } = await axios.post(
                    '/api/users/update/password',
                    {
                      oldPassword: oldPass,
                      newPassword: value,
                    }
                  )
                  if (data.Error) {
                    setErrored(true)
                    setError(data.Error)
                  } else {
                    setOpen(false)
                  }
                  break
                }
                case 'ImageURL':
                  {
                    const { data } = await axios.post(
                      '/api/users/update/imageURL',
                      { imageURL: value }
                    )
                    if (data.Error) {
                      setErrored(true)
                      setError(data.Error)
                    } else {
                      setOpen(false)
                    }
                  }
                  break
                default:
                  console.log('Something probably went wrong.' + option)
                  break
              }
            }}
          >
            Submit
          </button>
        </form>
      )
    } else {
      return <div></div>
    }
  }

  function oldPassword() {
    return (
      <>
        <label htmlFor='oldpass'>{`Old Password`}</label>
        <input
          id='oldpass'
          type='text'
          value={oldPass}
          onChange={e => {
            setOldPass(e.target.value)
          }}
        />
      </>
    )
  }

  return (
    <>
      <div>
        <button
          className='round header-button'
          onClick={() => {
            setErrored(false)
            setError('')
            setEditItem('')
            setOpen(!open)
          }}
        >
          Edit Account
        </button>
        {menu(open)}
      </div>
    </>
  )
}

export default EditAccount
