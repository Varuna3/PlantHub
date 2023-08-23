import { useNavigate } from 'react-router-dom'

const Header = ({ uname, fname, lname, imageURL, myImageURL }) => {
  const nav = useNavigate()

  return (
    <div style={{ border: '2px solid green', display: 'flex' }}>
      <h1>{uname}</h1>
      <p>
        {fname} {lname}
      </p>
      <img src={imageURL} alt='' />
      <button style={{ height: 'auto' }}>
        <img
          src={myImageURL}
          alt=''
          style={{ width: '100%', height: '80%' }}
          onClick={() => {
            nav('/')
          }}
        />
        <p>Home</p>
      </button>
    </div>
  )
}

export default Header
