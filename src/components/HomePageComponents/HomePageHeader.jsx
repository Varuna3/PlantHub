import NewPlantButton from './HeaderComponents/NewPlantButton'
import ProfileButton from './HeaderComponents/ProfileButton'

const HomePageHeader = ({ user }) => {
  return (
    <div style={{ border: '2px solid green' }}>
      <NewPlantButton></NewPlantButton>
      <ProfileButton user={user}></ProfileButton>
    </div>
  )
}

export default HomePageHeader
