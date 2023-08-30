import { Component, ReactElement, useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddFriendPage: React.FC = () => {
  const [user, setUser]: [any, Function] = useState({})
  const [uname, setUname] = useState('')
  const [users, setUsers]: [any[], Function] = useState([])
  const [error, setError] = useState(false)
  const [success, setSuccess]: [string, Function] = useState('')

  useEffect(() => {
    let tmp2: any = {}
    axios.post('/api/users/').then(({ data }) => {
      tmp2 = data
      setUser(tmp2)
    })
    axios.get('/api/users').then(({ data }) => {
      const tmp = data.map((e: element) => {
        if (e.uname !== tmp2.uname) {
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
        }
      })
      setUsers(tmp)
    })
  }, [])

  interface element {
    id: number
    uname: string
    fname: string
    lname: string
    imageURL: string
  }

  async function handleClickEvent(e: element): Promise<any> {
    const { data } = await axios.post('/api/friends/requests/create', {
      userId: e.id,
    })
    if (data.Error) {
      toast.error(data.Error, {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        style: { background: '#d52941' },
      })
    } else {
      toast.success('Success!', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        style: { background: '#73e2a7' },
      })
    }
  }

  return (
    <>
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <form action=''>
          <label htmlFor='search'>Username</label>
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
              const tmp = data.map((e: element) => {
                //@ts-ignore
                if (e.uname !== user.uname) {
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
                }
              })
              setUsers(tmp)
            }}
          >
            Search
          </button>
        </form>
        <div style={error ? { border: '2px solid red' } : {}}>{error}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{users}</div>
      </div>
    </>
  )
}

export default AddFriendPage
