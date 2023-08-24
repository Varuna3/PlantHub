import React from 'react'

interface props {
  error: any
  message: any
}

const ErrorMessage = ({ error, message }: props) => {
  if (error) {
    return <p>{`${message}`}</p>
  } else {
    return <></>
  }
}

export default ErrorMessage
