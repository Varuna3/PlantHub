import React from 'react'

interface props {
  password: string
  setPassword: Function
}

const Password = ({ password, setPassword }: props) => {
  return (
    <div>
      <label htmlFor='Password'>Password:</label>
      <input
        id='Password'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      ></input>
    </div>
  )
}

export default Password
