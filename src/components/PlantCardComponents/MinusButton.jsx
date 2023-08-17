const MinusButton = ({ name, decrement }) => {
  return (
    <button
      onClick={() => {
        decrement(name)
      }}
    >
      -
    </button>
  )
}

export default MinusButton
