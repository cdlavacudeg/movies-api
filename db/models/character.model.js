const { Model, DataTypes } = require('sequelize')

const CHARACTER_TABLE = 'characters'

const CharacterSchema = {
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
  age: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  weight: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  history: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
}

class Character extends Model {
  static associate(models) {
    this.belongsToMany(models.Movie, {
      as: 'movies',
      through: models.MovieCharacter,
      foreignKey: 'characterId',
      otherKey: 'movieId',
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CHARACTER_TABLE,
      modelName: 'Character',
      timestamps: false,
    }
  }
}

module.exports = { Character, CharacterSchema, CHARACTER_TABLE }
