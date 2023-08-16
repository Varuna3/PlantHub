import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const PlantRequestPage = () => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [imageURL, setImageURL] = useState('')

  const nav = useNavigate()

  return (
    <>
      <form action=''>
        <label htmlFor='name'>Name: </label>
        <input
          id='name'
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor='type'>Type: </label>
        <input
          id='type'
          type='text'
          value={type}
          onChange={e => setType(e.target.value)}
        />
        <label htmlFor='imageURL'>ImageURL: </label>
        <input
          id='imageURL'
          type='text'
          value={imageURL}
          onChange={e => setImageURL(e.target.value)}
        />
        <button
          onClick={async e => {
            e.preventDefault()
            const res = await axios.post('/api/plants/newplant/request', {
              name,
              type,
              imageURL,
            })
            if (res) {
              nav('/')
            }
          }}
        >
          Submit Request
        </button>
      </form>
    </>
  )
}

export default PlantRequestPage
