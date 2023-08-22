import { useEffect, useState } from 'react'
import axios from 'axios'

const AddFriendPage = () => {
  const [uname, setUname] = useState('')
  const [users, setUsers] = useState([])
  const [error, setError] = useState(false)

  async function handleClickEvent(e) {
    console.log(e)
    const { data } = await axios.post('/api/friends/requests/create', {
      userId: e.id,
    })
    if (data.Error) {
      console.log(data.Error)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <form action=''>
        <label htmlFor='search'>Username: </label>
        <input
          id='search'
          type='text'
          autoComplete='off'
          value={uname}
          onChange={e => {
            setUname(e.target.value)
          }}
        />
        <button
          onClick={async e => {
            e.preventDefault()
            const { data } = await axios.get(`/api/users/${uname}`)
            const tmp = data.map(e => {
              return (
                <div key={e.id} className='user-card'>
                  <h1>{e.uname}</h1>
                  <img src={e.imageURL} />
                  <p>
                    {e.fname} {e.lname}
                  </p>
                  <button
                    onClick={() => {
                      handleClickEvent(e)
                    }}
                  >
                    Send Request
                  </button>
                </div>
              )
            })
            setUsers(tmp)
          }}
        >
          Search
        </button>
      </form>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>{users}</div>
    </div>
  )
}

export default AddFriendPage
