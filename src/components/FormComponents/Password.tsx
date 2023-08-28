import React from 'react'

interface props {
  password: string
  setPassword: Function
}

const Password: React.FC<props> = ({ password, setPassword }) => {
  return (
    <div className='input-field'>
      <label htmlFor='Password'>Password</label>
      <input
        id='Password'
        className='round input-box'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      ></input>
    </div>
  )
}

export default Password
