const Header = ({ uname, fname, lname, imageURL }) => {
  return (
    <div style={{ border: '2px solid green', display: 'flex' }}>
      <h1>{uname}</h1>
      <p>
        {fname} {lname}
      </p>
      <img src={imageURL} alt='' />
    </div>
  )
}

export default Header
