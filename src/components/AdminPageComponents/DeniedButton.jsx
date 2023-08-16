const DeniedButton = ({ setStatus }) => {
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
