import { Link } from 'react-router-dom'

const NewPlantButton = () => {
  return (
    <>
      <Link to='/NewPlant'>
        <button style={{ width: '100px', height: '50px' }}>
          <p>New Plant</p>
        </button>
      </Link>
    </>
  )
}

export default NewPlantButton
