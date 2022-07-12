const { Model, DataTypes } = require('sequelize')

const { CHARACTER_TABLE } = require('./character.model')
const { MOVIE_TABLE } = require('./movie.model')

const MOVIE_CHARACTER_TABLE = 'movies-characters'

const MovieCharacterSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  movieId: {
    field: 'movie_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: MOVIE_TABLE,
      key: 'id',
    },
    onupdate: 'CASCADE',
    ondelete: 'SET NULL',
  },
  characterId: {
    field: 'character_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CHARACTER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}

class MovieCharacter extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_CHARACTER_TABLE,
      modelName: 'MovieCharacter',
      timestamps: false,
    }
  }
}

module.exports = { MovieCharacter, MovieCharacterSchema, MOVIE_CHARACTER_TABLE }
