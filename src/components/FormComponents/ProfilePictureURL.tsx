import React from 'react'

interface props {
  imageURL: string
  setImageURL: Function
}

const ProfilePictureURL: React.FC<props> = ({ imageURL, setImageURL }) => (
  <div className='input-field'>
    <label htmlFor='ImageURL'>Profile Picture URL</label>
    <input
      id='ImageURL'
      className='round input-box'
      type='text'
      value={imageURL}
      onChange={e => setImageURL(e.target.value)}
    ></input>
  </div>
)

export default ProfilePictureURL
