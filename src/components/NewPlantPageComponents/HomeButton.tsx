import { useNavigate } from 'react-router-dom'

const HomeButton: React.FC = () => {
  const nav = useNavigate()
  return (
    <>
      <button
        style={{ width: '100px', height: '50px' }}
        onClick={() => {
          nav('/Profile')
        }}
      >
        Home
      </button>
    </>
  )
}

export default HomeButton
