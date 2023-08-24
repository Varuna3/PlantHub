import React from 'react'

interface props {
  setStatus: Function
}

const ApproveButton = ({ setStatus }: props) => (
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
