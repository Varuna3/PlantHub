import { useNavigate } from 'react-router-dom'

interface props {
  id: number
  uname: string
  fname: string
  lname: string
  imageURL: string
}

const FriendCard: React.FC<props> = ({ id, uname, fname, lname, imageURL }) => {
  const nav = useNavigate()

  return (
    <div className='user-card'>
      <h1>{uname}</h1>
      <p>
        {fname}, {lname}
      </p>
      <img src={imageURL} alt='' />
      <button
        onClick={() => {
          nav(`/Visit/${uname}`)
        }}
      >
        Visit
      </button>
    </div>
  )
}

export default FriendCard
