const { Model, DataTypes, Sequelize } = require('sequelize')
const { GENDER_TABLE } = require('./gender.model.js')

const MOVIE_TABLE = 'movies'

const MovieSchema = {
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
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  calification: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  genderId: {
    field: 'gender_id',
    allowNull: true,
    type: DataTypes.INTEGER,
    references: {
      model: GENDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}

class Movie extends Model {
  static associate(models) {
    this.belongsTo(models.Gender, { as: 'gender' })
    this.belongsToMany(models.Character, {
      as: 'characters',
      through: models.MovieCharacter,
      foreignKey: 'movieId',
      otherKey: 'characterId',
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_TABLE,
      modelName: 'Movie',
      timestamps: false,
    }
  }
}

module.exports = { Movie, MovieSchema, MOVIE_TABLE }
