import React from 'react'
import { toast } from 'react-toastify'

interface props {
  setStatus: Function
}

const DeniedButton: React.FC<props> = ({ setStatus }) => {
  return (
    <>
      <button
        className='round admin-button'
        style={{ backgroundColor: '#d52941' }}
        onClick={async () => {
          setStatus('Denied')
          toast.success('Success!', { style: { background: '#73e2a7' } })
        }}
      ></button>
    </>
  )
}

export default DeniedButton
