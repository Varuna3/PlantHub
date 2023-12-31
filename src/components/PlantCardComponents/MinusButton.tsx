import { ReactElement } from 'react'

interface props {
  name: string
  decrement: Function
}

const MinusButton = ({ name, decrement }: props): ReactElement => {
  return (
    <button
      className='round count-button'
      onClick={() => {
        decrement(name)
      }}
    >
      -
    </button>
  )
}

export default MinusButton
