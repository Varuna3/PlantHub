import React, { EventHandler } from 'react'

interface props {
  fname: string
  setFname: Function
}

const FirstName: React.FC<props> = ({ fname, setFname }) => {
  return (
    <div>
      <label htmlFor='FirstName'>First Name: </label>
      <input
        id='FirstName'
        type='text'
        value={fname}
        onChange={e => setFname(e.target.value)}
      ></input>
    </div>
  )
}

export default FirstName
