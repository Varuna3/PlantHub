import React from 'react'

interface props {
  imageURL: string
  setImageURL: Function
}

const ProfilePictureURL: React.FC<props> = ({ imageURL, setImageURL }) => (
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

export default ProfilePictureURL
