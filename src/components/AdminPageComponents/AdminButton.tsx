import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminButton: React.FC = () => {
  const nav = useNavigate()

  return (
    <>
      <button
        style={{ width: 100, height: 50 }}
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
