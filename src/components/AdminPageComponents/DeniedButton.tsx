import React from 'react'

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
        }}
      ></button>
    </>
  )
}

export default DeniedButton
