import { DataTypes, Model } from 'sequelize'
import util from 'util'

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
      unique: true,
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
export { Plant, User, Count }
