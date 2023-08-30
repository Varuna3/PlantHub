import Sequelize, { DataTypes, Model } from 'sequelize'
import url from 'url'
import util from 'util'
//@ts-ignore
const sequelize = new Sequelize('postgresql:///planthub')

import PLANTS from '../plants/plants.json' assert { type: 'json' }
import { seedPlants } from './seeders'

// const Sequelize.Op = Sequelize.Sequelize.Op

class Plant extends Model {
  declare id: number
  declare name: string
  declare type: string
  declare imageURL: string;
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

class User extends Model {
  declare id: number
  declare uname: string
  declare fname: string
  declare lname: string
  declare passwordHash: string
  declare imageURL: string
  declare plants: Plant[]
  declare isAdmin: boolean
  declare addFriend: Function
  declare addPlant: Function;
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

class Count extends Model {
  declare count: number;
  // --> THIS IS AN ASSOCIATION TABLE
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

class Request extends Model {
  declare name: string
  declare type: string
  declare imageURL: string;
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

class Friend extends Model {
  declare userId: number
  declare friendId: number
  declare status: string;
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

Plant.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(35),
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING(35),
    },
    imageURL: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'plant',
    sequelize,
    timestamps: false,
  }
)

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    fname: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    lname: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    imageURL: {
      allowNull: false,
      type: DataTypes.STRING(1000),
    },
    uname: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    passwordHash: {
      allowNull: false,
      type: DataTypes.STRING(10000),
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: 'user',
    sequelize,
    timestamps: false,
  }
)

Count.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    count: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: 'count',
    sequelize,
    timestamps: false,
  }
)

Friend.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING(20),
    },
  },
  {
    modelName: 'friend',
    sequelize,
    timestamps: false,
  }
)

Request.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(50),
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    imageURL: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'request',
    sequelize,
    timestamps: false,
  }
)

Plant.belongsToMany(User, { through: Count })
User.belongsToMany(Plant, { through: Count })

User.belongsToMany(User, { as: 'friends', through: Friend })

//  ONLY IF RUNNING SCRIPT FROM COMMAND LINE  --> npm run superinit || node scripts/seed.js
if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log('Syncing database...')
  await sequelize.sync({ force: true })
  await seedPlants(Plant, PLANTS)
  console.log('Finished syncing database')
  await sequelize.close()
}

export { Plant, User, Count, Request, Friend, sequelize }
