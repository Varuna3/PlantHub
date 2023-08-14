const ProfilePictureURL = ({ imageURL, setImageURL }) => {
  return (
    <div>
      <label htmlFor='ImageURL'>Profile Picture URL: </label>
      <input
        id='ImageURL'
        type='text'
        value={imageURL}
        onChange={e => setImageURL(e.target.value)}
      ></input>
    </div>
  )
}

export default ProfilePictureURL
