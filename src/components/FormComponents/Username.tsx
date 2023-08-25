import React from 'react'

interface props {
  uname: string
  setUname: Function
}

const Username: React.FC<props> = ({ uname, setUname }) => {
  return (
    <div>
      <label htmlFor='Username'>Username:</label>
      <input
        id='Username'
        type='text'
        value={uname}
        onChange={e => setUname(e.target.value)}
      ></input>
    </div>
  )
}

export default Username
