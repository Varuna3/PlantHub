import React from 'react'

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
      }}
    ></button>
  </>
)

export default ApproveButton
