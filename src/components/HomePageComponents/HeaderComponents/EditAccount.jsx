import { useState } from 'react'

const EditAccount = () => {
  const [open, setOpen] = useState(false)
  const [editItem, setEditItem] = useState('')
  const [value, setValue] = useState('')
  const [oldPass, setOldPass] = useState('')

  function menu(open) {
    if (open) {
      return (
        <div className='test-box' style={{ width: '250px' }}>
          <div style={{ width: '200px', display: 'flex' }}>
            <button
              className='menuButton'
              onClick={() => {
                setEditItem('Username')
              }}
            >
              Username
            </button>
            <button
              className='menuButton'
              onClick={() => {
                setEditItem('Password')
              }}
            >
              Password
            </button>
            <button
              className='menuButton'
              onClick={() => {
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

  function textBox(option) {
    if (option.length > 0) {
      return (
        <form>
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
            onClick={e => {
              e.preventDefault()
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
          onClick={() => {
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
