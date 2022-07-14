const { Model, DataTypes } = require('sequelize')

const GENDER_TABLE = 'genders'

const GenderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
}

class Gender extends Model {
  static associate(models) {
    this.hasMany(models.Movie, {
      as: 'movies',
      foreignKey: 'genderId',
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GENDER_TABLE,
      modelName: 'Gender',
      timestamps: false,
    }
  }
}

module.exports = { Gender, GenderSchema, GENDER_TABLE }
