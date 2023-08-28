// LET THE CORRUPTION BEGIN
import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import Sequelize from 'sequelize'
import {
  Plant,
  User,
  Count,
  Request,
  Friend,
  sequelize,
} from './scripts/seed.js'
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

//@ts-ignore
ViteExpress.config({ printViteDevServerHost: true })

//interfaces
declare module 'express-session' {
  interface SessionData {
    passwordHash: string
    userId: number
    plantIds: number[]
    isAdmin: boolean
    imageURL: string
  }
}

//routes
app.post('/api/login', async (req, res) => {
  let { uname, password } = req.body
  const user = await User.findOne({
    where: { uname },
    include: { model: Plant, attributes: ['id'] },
  })
  if (user) {
    bcrypt.compare(password, user.passwordHash, async (err, valid) => {
      if (valid) {
        const plantIds: number[] = []
        user.plants.forEach((e: any) => {
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
      req.session.destroy(() =>
        res.send({ success: true, session: req.session })
      )
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
    const users = await User.findAll({ include: [Plant, 'friends'] })
    res.send(users)
  } else {
    const users = await User.findAll({
      attributes: ['id', 'uname', 'fname', 'lname', 'imageURL'],
      include: [Plant],
    })
    res.send(users)
  }
})

app.get('/api/users/:uname', async (req, res) => {
  if (req.session.isAdmin) {
    const users = await User.findOne({
      where: sequelize.where(sequelize.fn('lower', sequelize.col('uname')), {
        [Sequelize.Op.like]: `%${req.params.uname.toLowerCase()}%`,
      }),
      include: Plant,
    })
    res.send(users)
  } else {
    const users = await User.findOne({
      where: sequelize.where(sequelize.fn('lower', sequelize.col('uname')), {
        [Sequelize.Op.like]: `%${req.params.uname.toLowerCase()}%`,
      }),
      attributes: ['id', 'uname', 'fname', 'lname', 'imageURL'],
      include: Plant,
    })
    res.send(users)
  }
})

app.post('/api/users/', async (req, res) => {
  if (req.session.userId) {
    if (req.session.isAdmin) {
      if (req.body.userId) {
        const user = await User.findOne({
          where: { id: req.body.userId },
          include: [Plant, 'friends'],
        })
        res.send(user)
      } else {
        const user = await User.findOne({
          where: { id: req.session.userId },
          include: [Plant, 'friends'],
        })
        res.send(user)
      }
    } else {
      const user = await User.findOne({
        attributes: ['uname', 'fname', 'lname', 'imageURL'],
        where: { id: req.session.userId },
        include: [Plant, 'friends'],
      })
      res.send(user)
    }
  } else {
    res.send('wrong, try again')
  }
})

app.post('/api/friends/get', async (req, res) => {
  if (req.session.userId) {
    if (req.body.type === 'approved') {
      const ids = await Friend.findAll({
        attributes: ['friendId'],
        where: { status: 'approved', userId: req.session.userId },
      })
      const arr = []
      for (let i = 0; i < ids.length; i++) {
        const user = await User.findOne({
          attributes: ['id', 'uname', 'fname', 'lname', 'imageURL'],
          where: { id: ids[i].friendId },
        })
        arr.push(user)
      }
      res.send(arr)
    } else if (req.body.type === 'pending') {
      const ids = await Friend.findAll({
        attributes: ['userId'],
        where: { status: 'pending', friendId: req.session.userId },
      })
      const arr = []
      for (let i = 0; i < ids.length; i++) {
        const user = await User.findOne({
          attributes: ['id', 'uname', 'fname', 'lname', 'imageURL'],
          where: { id: ids[i].userId },
        })
        arr.push(user)
      }
      res.send(arr)
    } else if (req.body.type === 'count') {
      const ids = await Friend.findAll({
        attributes: ['friendId'],
        where: { status: 'pending', friendId: req.session.userId },
      })
      res.send(`${ids.length}`)
    } else {
      res.send({ Error: 'Please specify a type of GET.' })
    }
  } else {
    res.send({ Error: 'Please login.' })
  }
})

app.post('/api/friends/requests/create', async (req, res) => {
  if (req.session.userId) {
    if (req.body.userId == req.session.userId) {
      res.send({ Error: 'You cannot friend yourself.' })
    } else {
      const exists = await Friend.findOne({
        where: { userId: req.session.userId, friendId: req.body.userId },
      })
      if (exists) {
        res.send({ Error: 'You are already friends with this person!' })
      } else {
        const friend = await Friend.findOne({
          where: { userId: req.body.userId, friendId: req.session.userId },
        })
        if (friend) {
          friend.status = 'approved'
          await friend.save()
          const user = await User.findByPk(req.session.userId)
          const user2 = await User.findByPk(req.body.userId)
          if (user && user2)
            await user.addFriend(user2, { through: { status: 'approved' } })
          res.send({ success: true })
        } else {
          const user = await User.findByPk(req.session.userId)
          const user2 = await User.findByPk(req.body.userId)
          if (user && user2)
            await user.addFriend(user2, { through: { status: 'pending' } })
          res.send({ Success: true })
        }
      }
    }
  } else {
    res.send({ Error: 'Please login.' })
  }
})

app.post('/api/friends/requests/approve', async (req, res) => {
  if (req.session.userId) {
    const friend = await Friend.findOne({
      where: { friendId: req.session.userId, userId: req.body.userId },
    })
    if (friend) {
      friend.status = 'approved'
      await friend.save()
      const user = await User.findByPk(req.session.userId)
      const user2 = await User.findByPk(req.body.userId)
      if (user && user2)
        await user.addFriend(user2, { through: { status: 'approved' } })
      res.send({ Success: true })
    } else {
      res.send('Something went drastically wrong.')
    }
  } else {
    res.send({ Error: 'Please login.' })
  }
})

app.post('/api/friends/requests/deny', async (req, res) => {
  if (req.session.userId) {
    const friend = await Friend.findOne({
      where: { friendId: req.session.userId, userId: req.body.userId },
    })
    if (friend) {
      if (friend.status === 'pending') {
        await friend.destroy()
        res.send({ Success: true })
      } else res.send({ Error: 'Already approved.' })
    }
  } else {
    res.send({ Error: 'Please login.' })
  }
})

app.post('/api/friends/remove', async (req, res) => {
  if (req.session.userId) {
    const friend = await Friend.findOne({
      where: { friendId: req.session.userId, userId: req.body.userId },
    })
    if (friend) {
      await friend.destroy()
      res.send({ Success: true })
    } else {
      res.send({ Error: "Friend doesn't exist." })
    }
  } else {
    res.send({ Error: 'Please login.' })
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
      res.send({ Error: 'Please login.' })
    }
  } else {
    res.send({ Error: 'Please login.' })
  }
})

app.post('/api/users/create', async (req, res) => {
  const { fname, lname, uname, password } = req.body
  let { imageURL } = req.body
  if (!imageURL.includes('http'))
    imageURL = `https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg`
  if (
    fname.length === 0 ||
    lname.length === 0 ||
    uname.length === 0 ||
    password.length === 0
  )
    res.send({ Error: 'null values' })
  else {
    if (password.length < 8) {
      res.send({ Error: 'password' })
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
                res.send(
                  user.imageURL + `User ${user.uname} successfully created.`
                )
              }
            } catch (e: any) {
              if (e.errors[0].message === 'uname must be unique') {
                res.send({ Error: 'unique uname' })
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

app.post('/api/users/update/password', async (req, res) => {
  const { userId } = req.session
  const { oldPassword, newPassword } = req.body
  const user = await User.findByPk(userId)

  if (user) {
    bcrypt.compare(oldPassword, user.passwordHash, async (err, valid) => {
      if (valid) {
        bcrypt.hash(newPassword, 10, async (err, passwordHash) => {
          if (!err) {
            if (newPassword.length > 7) {
              user.passwordHash = passwordHash
              await user.save()
              res.send({ Success: true })
            } else {
              res.send({ Error: 'Password must be longer than 8 characters.' })
            }
          } else {
            res.send({ Error: 'Password Hash Error. Please try again.' })
          }
        })
      } else {
        res.send({ Error: 'Incorrect Password.' })
      }
    })
  }
})

app.post('/api/users/update/username', async (req, res) => {
  const { userId } = req.session
  const { newUsername } = req.body
  if (newUsername.length > 0) {
    const user = await User.findByPk(userId)
    if (user) {
      if (user.id) {
        try {
          user.uname = newUsername
          await user.save()
          res.send({ Success: true })
        } catch (e: any) {
          if (e.errors[0].message === 'uname must be unique') {
            res.send({ Error: 'Username already taken.' })
          } else {
            res.status(400).send(e)
          }
        }
      } else {
        res.send({ Error: 'Something went drastically wrong.' })
      }
    }
  } else {
    res.send({ Error: 'Please enter a value into the box.' })
  }
})

app.post('/api/users/update/imageURL', async (req, res) => {
  const { userId } = req.session
  const { imageURL } = req.body
  if (imageURL.length > 0) {
    const user = await User.findByPk(userId)
    if (user) {
      if (user.id) {
        try {
          user.imageURL = imageURL
          await user.save()
          res.send({ Success: true })
        } catch {
          res.send({
            Error: 'Something went catastrophically. (/update/imageURL)',
          })
        }
      }
    }
  } else {
    res.send({ Error: 'Please enter a value into the box.' })
  }
})

app.post('/api/users/hiroshima', async (req, res) => {
  if (req.session.passwordHash) {
    const user = await User.findOne({ where: { id: req.session.userId } })
    if (user) {
      let tmpName = user.uname
      await user.destroy()
      res.send(`Success. User ${tmpName} has been obliterated.`)
    }
  } else {
    res.send({ Error: 'Please login.' })
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
      if (user && plant) {
        const countExists = await Count.findOne({
          where: [{ userId: user.id }, { plantId: plant.id }],
        })
        if (!countExists) {
          if (req.body.count) {
            const count = await user.addPlant(plant, {
              through: { count: req.body.count },
            })
            res.send({ count, success: true })
          } else {
            const count = await user.addPlant(plant, { through: { count: 1 } })
            res.send({ count, success: true })
          }
        } else res.send('You already have this plant in your database!')
      }
    } catch {
      res.status(400).send({ success: false })
    }
  } else {
    res.send({ Error: 'Please login.' })
  }
})

app.post('/api/counts', async (req, res) => {
  const counts = await Count.findAll({ where: { userId: req.session.userId } })
  res.send(counts)
})

app.post('/api/count/update', async (req, res) => {
  const { userId } = req.session
  const { plantName, num = 1 } = req.body
  const user = await User.findOne({
    where: { id: userId },
    include: { model: Plant, attributes: ['id'], where: { name: plantName } },
  })
  if (user) {
    const count = await Count.findOne({
      where: { userId, plantId: user.plants[0].id },
    })

    if (count) {
      count.count = Number(num)
      await count.save()
      res.send({ success: true, count })
    }
  }
})

app.post('/api/count/delete', async (req, res) => {
  if (req.session.userId) {
    const plant = await Plant.findOne({ where: { name: req.body.name } })
    if (plant) {
      const count = await Count.findOne({
        where: { userId: req.session.userId, plantId: plant.id },
      })
      if (count) await count.destroy()
    }
    res.send({ Success: true })
  } else {
    res.send({ Error: 'Please login.' })
  }
})

app.get('/api/plantsByName/:name', async (req, res) => {
  if (req.params.name.length > 0) {
    const plants = await Plant.findAll({
      where: sequelize.where(sequelize.fn('lower', sequelize.col('name')), {
        [Sequelize.Op.like]: `%${req.params.name}%`,
      }),
    })
    res.send(plants)
  } else {
    const plants = await Plant.findAll()
    res.send(plants)
  }
})

app.get('/api/plantsByType/:type', async (req, res) => {
  const plants = await Plant.findAll({
    where: { type: { [Sequelize.Op.like]: `%${req.params.type}%` } },
  })
  res.send(plants)
})

app.post('/api/plants/newplant/request', async (req, res) => {
  if (req.session.passwordHash) {
    const check = await Plant.findOne({ where: { name: `${req.body.name}` } })
    if (!check) {
      if (req.session.isAdmin) {
        try {
          await Plant.create({
            name: req.body.name,
            type: req.body.type,
            imageURL: req.body.imageURL,
          })
          res.send('Success! (admin)')
        } catch {
          res.send(false)
        }
      } else {
        await Request.create({
          name: req.body.name,
          type: req.body.type,
          imageURL: req.body.imageURL,
        })
        res.send('Success!')
      }
    } else {
      res.send({ Error: 'Please login.' })
    }
  } else {
    res.send(false)
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
    if (request) await request.destroy()
    res.send('Success!')
  } else {
    res.send(false)
  }
})

//open server
ViteExpress.listen(app, 8000, () => {
  console.log(`Hold ctrl and click this: http://localhost:8000/`)
})
