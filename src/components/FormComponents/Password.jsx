const Password = ({ password, setPassword }) => {
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
