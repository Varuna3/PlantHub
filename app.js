import express from 'express'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import { Plant, User, Count } from './scripts/seed.js'

//middleware
const app = express()

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

app.get('/api/plants/:id', async (req, res) => {
  const plant = await Plant.findOne({ where: { id: req.params.id } })
  res.send(plant)
})

app.get('/api/users/', async (req, res) => {
  const users = await User.findAll()
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
    if (e.errors[0].message === 'uname must be unique')
      res.status(400).send('Error: Username already taken. Please try again.')
    else res.status(400).send(`Error: ${e.errors[0].message}`)
  }
})

//open server
ViteExpress.listen(app, 8000, () => {
  console.log(`Hold ctrl and click this: http://localhost:8000/`)
})
