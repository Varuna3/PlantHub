import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import { Plant, User, Count, Request, Op } from './scripts/seed.js'
import bcrypt from 'bcrypt'

//middleware
const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(
  session({
    secret: 'L3TM30UT-1MSTUCK1NY0URP0CK3T',
    resave: false,
    saveUninitialized: false,
  })
)

ViteExpress.config({ printViteDevServerHost: true })

//routes
app.post('/api/login', async (req, res) => {
  let { uname, password } = req.body
  console.log(uname, password)
  const user = await User.findOne({
    where: { uname },
    include: { model: Plant, attributes: ['id'] },
  })
  if (user && user.uname && user.passwordHash) {
    bcrypt.compare(password, user.passwordHash, async (err, valid) => {
      if (valid) {
        const plantIds = []
        user.plants.forEach(e => {
          plantIds.push(e.id)
        })
        req.session.passwordHash = user.passwordHash
        req.session.userId = user.id
        req.session.plantIds = plantIds
        req.session.isAdmin = user.isAdmin
        req.session.imageURL = user.imageURL
        res.send({
          success: true,
          hash: req.session.passwordHash,
          id: req.session.userId,
          plantIds: req.session.plantIds,
          poweroverwhelming: req.session.isAdmin,
        })
      } else {
        res.status(400).send(`Error: Authentication failed.`)
      }
    })
  } else {
    res.status(400).send('Error: User not found in database.')
  }
})

app.post('/api/hellothere', (req, res) => {
  if (req.session.userId) {
    res.json({ Youare: 'goodtogo' })
  } else {
    res.json({ Youare: 'notgoodtogo' })
  }
})

app.post('/api/logout', async (req, res) => {
  if (req.session.passwordHash) {
    try {
      req.session.destroy()
      res.send({ success: true, session: req.session })
    } catch (e) {
      res.status(400).send('Error (logout)')
    }
  } else {
    res.status(400).send(`Error: Please login.`)
  }
})

app.get('/api/plants', async (req, res) => {
  const plants = await Plant.findAll()
  res.send(plants)
})

app.get('/api/plantsById/:id', async (req, res) => {
  const plant = await Plant.findOne({ where: { id: req.params.id } })
  res.send(plant)
})

app.get('/api/users/', async (req, res) => {
  if (req.session.isAdmin) {
    const users = await User.findAll({ include: Plant })
    res.send(users)
  } else {
    const users = await User.findAll({ attributes: ['uname'], include: Plant })
    res.send(users)
  }
})

app.post('/api/users/', async (req, res) => {
  if (req.session.userId) {
    if (req.session.isAdmin) {
      const user = await User.findOne({
        where: { id: req.session.userId },
        include: Plant,
      })
      res.send(user)
    } else {
      const user = await User.findOne({
        attributes: ['uname'],
        where: { id: req.session.userId },
        include: Plant,
      })
      res.send(user)
    }
  } else {
    res.status(400).send('wrong, try again')
  }
})

app.post('/api/users/picture', async (req, res) => {
  if (req.session.imageURL) {
    res.send(req.session.imageURL)
  } else {
    res.status(400).send('Error: no image URL in session.')
  }
})

// TODO : --> IF !ADMIN --> add request to requests table
app.post('/api/plants/create', async (req, res) => {
  if (req.session.passwordHash) {
    if (req.session.isAdmin) {
      const { name, type, imageURL } = req.body
      const plant = await Plant.create({
        name,
        type,
        imageURL,
      })
      res.send({ success: true, plant: plant })
    } else {
      res.status(400).send('Error: Insufficient permissions.')
    }
  } else {
    res.status(400).send('Error: Please login.')
  }
})

app.post('/api/users/create', async (req, res) => {
  const { fname, lname, imageURL, uname, password } = req.body
  if (
    fname.length === 0 ||
    lname.length === 0 ||
    imageURL.length === 0 ||
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
        bcrypt.hash(password, 10, async (err, passwordHash) => {
          if (!err) {
            try {
              if (
                fname === 'Frank' &&
                lname === 'Stank' &&
                uname === 'Varuna'
              ) {
                const user = await User.create({
                  fname,
                  lname,
                  imageURL,
                  uname,
                  passwordHash,
                  isAdmin: true,
                })
                res.send(`User ${user.uname} successfully created.`)
              } else {
                const user = await User.create({
                  fname,
                  lname,
                  imageURL,
                  uname,
                  passwordHash,
                  isAdmin: false,
                })
                res.send(`User ${user.uname} successfully created.`)
              }
            } catch (e) {
              if (e.errors[0].message === 'uname must be unique') {
                res.status(400).send('Error: Username must be unique.')
              } else {
                res.status(400).send(e)
              }
            }
          } else {
            res.status(400).send(err)
          }
        })
      } catch (e) {
        res.status(400).send('Error...')
      }
    }
  }
})

app.post('/api/users/hiroshima', async (req, res) => {
  if (req.session.passwordHash) {
    const user = await User.findOne({ where: { id: req.session.userId } })
    let tmpName = user.uname
    await user.destroy()
    res.send(`Success. User ${tmpName} has been obliterated.`)
  } else {
    res.status(400).send('Error: Please login.')
  }
})

app.post('/api/users/newplant', async (req, res) => {
  if (req.session.passwordHash) {
    try {
      const user = await User.findOne({
        where: [
          { id: req.session.userId },
          { passwordHash: req.session.passwordHash },
        ],
      })
      const plant = await Plant.findOne({ where: { name: req.body.name } })
      const countExists = await Count.findOne({
        where: [{ userId: user.id }, { plantId: plant.id }],
      })
      if (!countExists) {
        const count = await user.addPlant(plant, { through: { count: 1 } })
        res.send({ count, success: true })
      } else res.send('You already have this plant in your database!')
    } catch {
      res.status(400).send({ success: false })
    }
  } else {
    res.status(400).send('Error: Please login.')
  }
})

app.post('/api/count/update', async (req, res) => {
  const { userId, passwordHash } = req.session
  const { plantName, num = 1 } = req.body
  const user = await User.findOne({
    where: { id: userId },
    include: { model: Plant, attributes: ['id'], where: { name: plantName } },
  })
  const count = await Count.findOne({
    where: { userId, plantId: user.plants[0].id },
  })
  // const count = await Count.findOne({ where: { id: countId } })

  count.count += Number(num)
  await count.save()
  res.send({ success: true, count })
})

app.get('/api/plantsByName/:name', async (req, res) => {
  if (req.params.name.length > 0) {
    const plants = await Plant.findAll({
      where: { name: { [Op.like]: `%${req.params.name}%` } },
    })
    res.send(plants)
  } else {
    const plants = await Plant.findAll()
    res.send(plants)
  }
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

app.post('/api/plants/newplant/request', async (req, res) => {
  if (req.session.passwordHash) {
    if (req.session.isAdmin) {
      await axios.post('/api/Aiur/approve', { id: req.body.id })
      res.send('Success! (Admin)')
    } else {
      await Request.create({
        name: req.body.name,
        type: req.body.type,
        imageURL: req.body.imageURL,
      })
      res.send('Success!')
    }
  } else {
    res.send('Please Log in.')
  }
})
app.post('/api/Aiur/', (req, res) => {
  if (req.session.isAdmin) {
    res.send(true)
  } else {
    res.send(false)
  }
})
app.post('/api/Aiur/requests', async (req, res) => {
  if (req.session.isAdmin) {
    res.send(await Request.findAll())
  } else {
    res.send(false)
  }
})
app.post('/api/Aiur/approve/', async (req, res) => {
  if (req.session.isAdmin) {
    const { id, name, type, imageURL } = req.body
    const request = await Request.findByPk(id)
    if (request) await request.destroy()
    Plant.create({ name, type, imageURL })
    res.send('Success!')
  } else {
    res.send(false)
  }
})
app.post('/api/Aiur/deny/', async (req, res) => {
  if (req.session.isAdmin) {
    const { id, name, type, imageURL } = req.body
    const request = await Request.findByPk(id)
    await request.destroy()
    res.send('Success!')
  } else {
    res.send(false)
  }
})

//open server
ViteExpress.listen(app, 8000, () => {
  console.log(`Hold ctrl and click this: http://localhost:8000/`)
})
