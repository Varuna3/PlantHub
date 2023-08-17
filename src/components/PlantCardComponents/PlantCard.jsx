import PlusButton from './PlusButton'

const PlantCard = ({ name, counts, type, img, increment }) => {
  let count = counts[`${name}`]

  return (
    <div className='test-card'>
      <h1>Name: {name}</h1>
      <h2>Type: {type}</h2>
      <img className='PlantImage' src={`${img}`} />
      <p>Count: {count}</p>
      <div>
        <PlusButton name={name} increment={increment} counts={counts} />
      </div>
    </div>
  )
}

export default PlantCard
