import React from 'react'
import { toast } from 'react-toastify'

interface props {
  setStatus: Function
}

const ApproveButton: React.FC<props> = ({ setStatus }) => (
  <>
    <button
      className='round admin-button'
      style={{ backgroundColor: '#73e2a7' }}
      onClick={async () => {
        setStatus('Approved')
        toast.success('Success!', { style: { background: '#73e2a7' } })
      }}
    ></button>
  </>
)

export default ApproveButton
