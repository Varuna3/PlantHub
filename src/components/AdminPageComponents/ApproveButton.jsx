const ApproveButton = ({ setStatus }) => {
  return (
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
}

export default ApproveButton
