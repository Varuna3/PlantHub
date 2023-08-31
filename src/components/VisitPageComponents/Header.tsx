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
        <h2>
          {fname} {lname}
        </h2>
        <img src={imageURL} alt='' className='profile-picture' />
        <button
          className='round header-button'
          onMouseUp={() => {
            nav('/friends')
          }}
        >
          <p>Back</p>
        </button>
      </div>
    </div>
  )
}

export default Header
