import { Component, ReactElement, useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddFriendPage: React.FC = () => {
  const [user, setUser]: [any, Function] = useState({})
  const [uname, setUname] = useState('')
  const [users, setUsers]: [any[], Function] = useState([])

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
            <div key={e.id} className='round-container user-card'>
              <h1>{e.uname}</h1>
              <h2>{e.fname}</h2>
              <img className='round-container card-image' src={e.imageURL} />
              <button
                className='round form-button'
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
      <div id='add-friend-page'>
        <form action='' className='user-search-field'>
          <label htmlFor='search'>Username</label>
          <input
            id='search'
            className='round input-box'
            type='text'
            autoComplete='off'
            value={uname}
            onChange={e => {
              setUname(e.target.value)
            }}
          />
          <button
            className='round form-button'
            style={{ margin: 20 }}
            onClick={async e => {
              e.preventDefault()
              const { data }: any = await axios.get(`/api/users/${uname}`)
              console.log(data)
              const tmp = data.map((e: element) => {
                //@ts-ignore
                if (e.uname !== user.uname) {
                  return (
                    <div key={e.id} className='round-container user-card'>
                      <h1>{e.uname}</h1>
                      <h2>{e.fname}</h2>
                      <img
                        className='round-container card-image'
                        src={e.imageURL}
                      />
                      <button
                        className='round form-button'
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
        <div className='users-container'>{users}</div>
      </div>
    </>
  )
}

export default AddFriendPage
