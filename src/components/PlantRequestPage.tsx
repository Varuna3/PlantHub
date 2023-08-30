import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const PlantRequestPage: React.FC = () => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [imageURL, setImageURL] = useState('')

  const nav = useNavigate()

  return (
    <div className='round-container newplant-request-page'>
      <ToastContainer
        position='top-center'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='colored'
      />
      <form action='' className='round-container user-plant-request-container'>
        <div className='input-field'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            className='round input-box'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='input-field'>
          <label htmlFor='type'>Type</label>
          <input
            id='type'
            className='round input-box'
            type='text'
            value={type}
            onChange={e => setType(e.target.value)}
          />
        </div>
        <div className='input-field'>
          <label htmlFor='imageURL'>ImageURL</label>
          <input
            id='imageURL'
            className='round input-box'
            type='text'
            value={imageURL}
            onChange={e => setImageURL(e.target.value)}
          />
        </div>
        <button
          style={{ height: 60 }}
          className='round form-button'
          onClick={async e => {
            e.preventDefault()
            if (name && type && imageURL) {
              const res = await axios.post('/api/plants/newplant/request', {
                name,
                type,
                imageURL,
              })
              if (res) {
                nav('/NewPlant')
              }
            } else {
              toast.error('Please fill out all required fields.', {
                style: { background: '#d52941' },
              })
            }
          }}
        >
          Submit Request
        </button>
        <button
          className='round form-button'
          onClick={() => {
            nav('/NewPlant')
          }}
        >
          Back
        </button>
      </form>
    </div>
  )
}

export default PlantRequestPage
