import axios from 'axios'
import { useEffect, useState } from 'react'
import RequestCard from './RequestCard.tsx'
import React from 'react'
import { ToastContainer } from 'react-toastify'

interface props {
  reqCount: number
  setReqCount: Function
}

interface element {
  uname: string
  fname: string
  lname: string
  imageURL: string
  id: number
}

const FriendRequestsPage: React.FC<props> = ({ reqCount, setReqCount }) => {
  const [reqs, setReqs] = useState([])

  useEffect(() => {
    axios.post('/api/friends/get', { type: 'pending' }).then(({ data }) => {
      setReqs(data)
    })
  }, [])

  let arr: any = []

  if (reqs.length > 0) {
    arr = reqs.map((e: element) => {
      return (
        <RequestCard
          e={e}
          key={e.id}
          reqCount={reqCount}
          setReqCount={setReqCount}
        />
      )
    })
  }

  return (
    <div>
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
      <div className='users-container'>
        {arr.length > 0
          ? arr
          : "You currently don't have any pending requests!"}
      </div>
    </div>
  )
}

export default FriendRequestsPage
