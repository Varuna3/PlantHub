import { Link } from 'react-router-dom'

const NewPlantButton: React.FC = () => {
  return (
    <>
      <Link to='/NewPlant'>
        <button style={{ width: '100px', height: '50px' }}>
          <p style={{ margin: 0 }}>Add New Plant to Profile</p>
        </button>
      </Link>
    </>
  )
}

export default NewPlantButton
