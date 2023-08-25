import { useNavigate } from 'react-router-dom'

const PlantRequestButton: React.FC = () => {
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
