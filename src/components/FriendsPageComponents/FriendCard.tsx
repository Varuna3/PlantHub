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
    <div className='round-container user-card'>
      <h1>{uname}</h1>
      <h2>
        {
          // this exists mostly just to see if i can do it.
          // Ideally they're going to properly capitalize their names.
          fname
            .split('')
            .map((e, i) => (i === 0 ? e.toUpperCase() : e))
            .join('')
        }
      </h2>
      <img src={imageURL} alt='' className='round-container card-image' />
      <button
        className='round form-button'
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
