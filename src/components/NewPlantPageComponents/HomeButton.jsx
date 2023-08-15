import { useNavigate } from 'react-router-dom'

const HomeButton = () => {
  const nav = useNavigate()
  return (
    <>
      <button
        style={{ width: '100px', height: '50px' }}
        onClick={() => {
          nav('/Profile') // <-- todo: fix
        }}
      >
        Home
      </button>
    </>
  )
}

export default HomeButton
