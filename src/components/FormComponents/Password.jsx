const Password = ({ password, setPassword }) => {
  return (
    <>
      <label htmlFor='Password'>Password:</label>
      <input
        id='Password'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      ></input>
    </>
  )
}

export default Password
