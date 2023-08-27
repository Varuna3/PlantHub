import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import RequestCard from './AdminPageComponents/RequestCard'

const Aiur: React.FC = () => {
  const [reqs, setReqs]: [any[], Function] = useState([])

  const nav = useNavigate()

  useEffect(() => {
    axios.post('/api/Aiur').then(({ data }) => {
      if (!data) {
        nav('/')
      }
      axios.post('/api/Aiur/requests').then(({ data }) => setReqs([...data]))
    })
  }, [])

  const arr = reqs.map(e => {
    return (
      <RequestCard
        key={e.id}
        id={e.id}
        name={e.name}
        type={e.type}
        imageURL={e.imageURL}
      />
    )
  })

  if (arr.length > 0) {
    return (
      <div style={{ display: 'flex' }}>
        <button onClick={() => nav('/Profile')}>Home</button>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{arr}</div>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={() => nav('/Profile')}>Home</button>
        <p>Nothing to do!</p>
      </div>
    )
  }
}

export default Aiur
