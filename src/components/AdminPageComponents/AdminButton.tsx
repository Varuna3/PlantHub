import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminButton: React.FC = () => {
  const nav = useNavigate()

  return (
    <>
      <button
        id='aiur-button'
        className='round header-button'
        onClick={() => {
          nav('/Aiur')
        }}
      >
        To Aiur
      </button>
    </>
  )
}

export default AdminButton
