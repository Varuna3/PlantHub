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
    <div id='header-container'>
      <div id='home-page-header' className='round-container'>
        <h1>{uname}</h1>
        <p>
          {fname} {lname}
        </p>
        <img src={imageURL} alt='' />
        <button
          style={{ height: 'auto' }}
          onMouseUp={() => {
            nav('/friends')
          }}
        >
          <img
            style={{ width: '100%', height: '80%' }}
            src={myImageURL}
            alt=''
          />
          <p>Back</p>
        </button>
      </div>
    </div>
  )
}

export default Header
