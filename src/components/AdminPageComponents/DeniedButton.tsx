import React from 'react'

interface props {
  setStatus: Function
}

const DeniedButton = ({ setStatus }: props) => {
  return (
    <>
      <button
        className='CardButton'
        style={{ backgroundColor: 'red' }}
        onClick={async () => {
          setStatus('Denied')
        }}
      ></button>
    </>
  )
}

export default DeniedButton
