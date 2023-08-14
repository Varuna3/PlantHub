const LastName = ({ lname, setLname }) => {
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
