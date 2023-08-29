interface props {
  name: string
  increment: Function
}

const PlusButton: React.FC<props> = ({ name, increment }) => {
  return (
    <button
      className='round count-button'
      onClick={() => {
        increment(name)
      }}
    >
      +
    </button>
  )
}

export default PlusButton
