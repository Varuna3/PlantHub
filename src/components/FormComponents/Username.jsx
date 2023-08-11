const Username = ({ uname, setUname }) => {
  return (
    <>
      <label htmlFor='Username'>Username:</label>
      <input
        id='Username'
        type='text'
        value={uname}
        onChange={e => setUname(e.target.value)}
      ></input>
    </>
  )
}

export default Username
