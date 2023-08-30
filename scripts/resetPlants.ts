import { Plant, User, Count, Request, Friend, sequelize } from './seed'
import { seedPlants } from './seeders'
import PLANTS from '../plants/plants.json' assert { type: 'json' }

const plants = await Plant.findAll()

plants.forEach(async e => {
  await e.destroy()
})

await sequelize.sync()

await seedPlants(Plant, PLANTS)

console.log('Finished resetting plants')
await sequelize.close()
