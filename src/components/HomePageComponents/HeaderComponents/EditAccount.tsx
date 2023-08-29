import { useState } from 'react'

import axios from 'axios'
import { toast } from 'react-toastify'

const EditAccount: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [editItem, setEditItem] = useState('')
  const [value, setValue] = useState('')
  const [oldPass, setOldPass] = useState('')
  const [Errored, setErrored] = useState(false)

  function menu() {
    return (
      <div
        className='round-container edit-account-box'
        style={{
          background: Errored ? 'rgb(255, 240, 240)' : 'rgb(240, 255, 240)',
          width: open ? '48vw' : '0',
          height: open ? '150px' : '0',
          marginLeft: open ? '0' : '24vw',
          padding: open ? '' : '0',
          border: open ? '2px solid green' : '0px solid green',
        }}
      >
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
                    toast.error(data.Error)
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
                    toast.error(data.Error)
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
                      toast.error(data.error)
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
