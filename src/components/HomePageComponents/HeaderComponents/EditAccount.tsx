import { useState } from 'react'

import axios from 'axios'
import { toast } from 'react-toastify'

const EditAccount: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [editItem, setEditItem] = useState('')
  const [value, setValue] = useState('')
  const [oldPass, setOldPass] = useState('')
  const [Errored, setErrored] = useState(false)

  const orientation: any = window.matchMedia('(orientation: portrait)').matches

  const width: string = orientation ? '75vw' : '48vw'
  const height: string = orientation ? '300px' : '150px'

  function menu() {
    return (
      <div
        className='round-container edit-account-box'
        style={{
          background: Errored ? 'rgb(255, 240, 240)' : 'rgb(240, 255, 240)',
          width: open ? width : '0',
          height: open ? height : '0',
          marginLeft: open ? '0' : '24vw',
          padding: open ? '' : '0',
          border: open ? '2px solid green' : '0px solid green',
        }}
      >
        <div style={{ width: '100%', display: 'flex' }}>
          <button
            className='round form-button'
            onClick={() => {
              setValue('')
              setEditItem('Username')
            }}
          >
            Username
          </button>
          <button
            className='round form-button'
            onClick={() => {
              setValue('')
              setEditItem('Password')
            }}
          >
            Password
          </button>
          <button
            className='round form-button'
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
  }

  function textBox(option: string) {
    if (option.length > 0) {
      return (
        <form autoComplete='off' id='edit-form'>
          <div className='input-field'>
            {option === 'Password' ? oldPassword() : <></>}
            <label htmlFor={`${option}`}>{`New ${option}`}</label>
            <input
              id={`${option}`}
              className='round input-box'
              type='password'
              value={value}
              onChange={e => {
                setValue(e.target.value)
              }}
            />
          </div>
          <button
            className='round form-button'
            style={{ width: '100%' }}
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
                    toast.error(data.Error)
                  } else {
                    setOpen(false)
                    toast.success('Success!', {
                      style: { background: '#73e2a7' },
                    })
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
                    toast.error(data.Error)
                  } else {
                    setOpen(false)
                    toast.success('Success!', {
                      style: { background: '#73e2a7' },
                    })
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
                      toast.error(data.error)
                    } else {
                      setOpen(false)
                      toast.success('Success!', {
                        style: { background: '#73e2a7' },
                      })
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
          className='round input-box'
          type='password'
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
            setEditItem('')
            setOpen(!open)
          }}
        >
          Edit Account
        </button>
        {menu()}
      </div>
    </>
  )
}

export default EditAccount
