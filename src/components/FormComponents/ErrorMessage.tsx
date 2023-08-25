import React from 'react'

interface props {
  error: any
  message: any
}

const ErrorMessage: React.FC<props> = ({ error, message }) => {
  if (error) {
    return <p>{`${message}`}</p>
  } else {
    return <></>
  }
}

export default ErrorMessage
