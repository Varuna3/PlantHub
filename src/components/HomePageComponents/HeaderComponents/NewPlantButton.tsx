import { Link } from 'react-router-dom'

const NewPlantButton: React.FC = () => {
  return (
    <>
      <Link to='/NewPlant'>
        <button className='round header-button'>
          <p style={{ margin: 0 }}>New Plant</p>
        </button>
      </Link>
    </>
  )
}

export default NewPlantButton
