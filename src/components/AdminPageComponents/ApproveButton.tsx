import React from 'react'

interface props {
  setStatus: Function
}

const ApproveButton: React.FC<props> = ({ setStatus }) => (
  <>
    <button
      className='CardButton'
      style={{ backgroundColor: 'green' }}
      onClick={async () => {
        setStatus('Approved')
      }}
    ></button>
  </>
)

export default ApproveButton
