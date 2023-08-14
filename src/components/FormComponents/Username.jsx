const Username = ({ uname, setUname }) => {
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
