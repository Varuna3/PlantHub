const ErrorMessage = ({ error, message }) => {
  if (error) {
    return <p>{`${message}`}</p>
  } else {
    return <></>
  }
}

export default ErrorMessage
