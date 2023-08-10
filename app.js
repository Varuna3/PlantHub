import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import axios from 'axios'
import { Plant, User, Count, Op } from './scripts/seed.js'
import bcrypt from 'bcrypt'

//middleware
const app = express()
// bcrypt.genSalt(10, (e, salt))

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

ViteExpress.config({ printViteDevServerHost: true })

//routes
app.get('/api/plants', async (req, res) => {
  const plants = await Plant.findAll()
  res.send(plants)
})

app.get('/api/plantsById/:id', async (req, res) => {
  const plant = await Plant.findOne({ where: { id: req.params.id } })
  res.send(plant)
})

app.get('/api/users/', async (req, res) => {
  const users = await User.findAll({ include: Plant })
  res.send(users)
})

app.post('/api/plants/create', async (req, res) => {
  const { name, type, imageURL } = req.body
  const plant = await Plant.create({
    name,
    type,
    imageURL,
  })
  res.send({ success: true, plant: plant })
})

app.post('/api/users/create', async (req, res) => {
  const { fname, lname, uname, password } = req.body
  if (
    fname.length === 0 ||
    lname.length === 0 ||
    uname.length === 0 ||
    password.length === 0
  )
    res.status(400).send('Error: Please fill out all information.')
  else {
    if (password.length < 8) {
      res
        .status(400)
        .send('Error: Password must be at least 8 characters in length.')
    } else {
      try {
        const user = await User.create({
          fname,
          lname,
          uname,
          password,
          isAdmin: false,
        })
        res.send(`User ${user.uname} successfully created.`)
      } catch (e) {
        switch (e.errors[0].message) {
          case 'uname must be unique':
            res
              .status(400)
              .send('Error: Username already taken. Please try again.')
            break
          default:
            res.status(400).send(`Error: ${e.errors[0].message}`)
            break
        }
      }
    }
  }
})

app.post('/api/users/hiroshima', async (req, res) => {
  const { password } = req.body
  const user = await User.findOne({ where: { id: req.body.id } })
  if (user.password === password) {
    let tmpName = user.uname
    await user.destroy()
    res.send(`Success. User ${tmpName} has been obliterated.`)
  } else {
    res.status(400).send({ success: false })
  }
})

app.post('/api/users/newplant', async (req, res) => {
  try {
    const user = await User.findOne({
      where: [{ id: req.body.id }, { password: req.body.password }],
    })
    const plant = await Plant.findOne({ where: { name: req.body.name } })
    const countExists = await Count.findOne({
      where: [{ userId: user.id }, { plantId: plant.id }],
    })
    if (!countExists) {
      const count = await user.addPlant(plant, { through: { count: 0 } })
      res.send({ count, success: true })
    } else res.status(400).send('You already have this plant in your database!')
  } catch {
    res.status(400).send({ success: false })
  }
})

app.post('/api/count/update', async (req, res) => {
  const { userId, password, countId, num = 1 } = req.body
  const user = await User.findOne({ where: { id: userId } })
  const count = await Count.findOne({ where: { id: countId } })
  if (user.password === password) {
    count.count += Number(num)
    await count.save()
    res.send({ success: true, count })
  }
})

app.get('/api/plantsByName/:name', async (req, res) => {
  const plants = await Plant.findAll({
    where: { name: { [Op.like]: `%${req.params.name}%` } },
  })
  res.send(plants)
})

app.get('/api/plantsByType/:type', async (req, res) => {
  const plants = await Plant.findAll({
    where: { type: { [Op.like]: `%${req.params.type}%` } },
  })
  res.send(plants)
})

app.get('/api/plants/hottest', async (req, res) => {
  const counts = await Count.findAll()
  let highestCount = { count: 0 }
  counts.forEach(e => {
    if (e.count > highestCount.count) highestCount = { ...e }
  })
  const user = await User.findAll({
    attributes: ['uname'],
    where: { id: highestCount.dataValues.userId },
  })
  const plant = await Plant.findByPk(highestCount.dataValues.plantId)
  res.send({ user, plant })
})

//open server
ViteExpress.listen(app, 8000, () => {
  console.log(`Hold ctrl and click this: http://localhost:8000/`)
})
