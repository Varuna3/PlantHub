const PlusButton = ({ name, increment }) => {
  return (
    <button
      onClick={() => {
        increment(name)
      }}
    >
      +
    </button>
  )
}

export default PlusButton
