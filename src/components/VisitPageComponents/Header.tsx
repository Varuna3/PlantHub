import { useNavigate } from 'react-router-dom'

interface props {
  uname: string
  fname: string
  lname: string
  imageURL: string
  myImageURL: string
}

const Header: React.FC<props> = ({
  uname,
  fname,
  lname,
  imageURL,
  myImageURL,
}) => {
  const nav = useNavigate()

  return (
    <div style={{ border: '2px solid green', display: 'flex' }}>
      <h1>{uname}</h1>
      <p>
        {fname} {lname}
      </p>
      <img src={imageURL} alt='' />
      <button
        style={{ height: 'auto' }}
        onMouseUp={() => {
          nav('/')
        }}
      >
        <img style={{ width: '100%', height: '80%' }} src={myImageURL} alt='' />
        <p>Home</p>
      </button>
    </div>
  )
}

export default Header
