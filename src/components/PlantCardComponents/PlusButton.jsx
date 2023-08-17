const PlusButton = ({ name, increment, counts }) => {
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
