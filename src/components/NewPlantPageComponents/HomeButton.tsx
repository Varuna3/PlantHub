import { useNavigate } from 'react-router-dom'

const HomeButton: React.FC = () => {
  const nav = useNavigate()
  return (
    <>
      <button
        className='round header-button'
        onClick={() => {
          nav('/Profile')
        }}
      >
        Back
      </button>
    </>
  )
}

export default HomeButton
