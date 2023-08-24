import React from 'react'

interface props {
  lname: string
  setLname: Function
}

const LastName = ({ lname, setLname }: props) => {
  return (
    <div>
      <label htmlFor='LastName'>Last Name: </label>
      <input
        id='LastName'
        type='text'
        value={lname}
        onChange={e => setLname(e.target.value)}
      ></input>
    </div>
  )
}

export default LastName
