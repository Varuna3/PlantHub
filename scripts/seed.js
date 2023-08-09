import Sequelize, { DataTypes, Model } from 'sequelize'
import util from 'util'

const sequelize = new Sequelize('postgresql:///planthub')

class Plant extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON()
  }
}

class Count extends Model {
  // --> THIS IS AN ASSOCIATION TABLE
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
    uname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
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

Plant.belongsToMany(User, { through: Count })
User.belongsToMany(Plant, { through: Count })

await sequelize.sync({ force: true })

const plants = await Plant.bulkCreate([
  {
    name: 'Mugwort',
    type: 'herb',
    imageURL:
      'https://www.outsidepride.com/images/products/detail/herbseed/mugwort.jpg',
  },
  {
    name: 'Pine',
    type: 'tree',
    imageURL:
      'https://uploads-ssl.webflow.com/5f157d6a58b3e36315a5d5b5/63ecb87ffc76f0079b6d2027_2.png',
  },
  {
    name: 'Sequoia',
    type: 'tree',
    imageURL:
      'https://tracks-trails.com/wp-content/uploads/2020/02/General_Sherman_tree_looking_up-scaled.jpg',
  },
])

const users = await User.bulkCreate([{}])

await sequelize.close()
