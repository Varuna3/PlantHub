import { useNavigate } from 'react-router-dom'

const PlantRequestButton = () => {
  const nav = useNavigate()

  return (
    <>
      <button
        onClick={() => {
          nav('/PlantRequest')
        }}
      >
        Submit Plant Request
      </button>
    </>
  )
}

export default PlantRequestButton
