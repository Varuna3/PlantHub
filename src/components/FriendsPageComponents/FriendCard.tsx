import { useNavigate } from 'react-router-dom'

const FriendCard = ({ id, uname, fname, lname, imageURL }) => {
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
