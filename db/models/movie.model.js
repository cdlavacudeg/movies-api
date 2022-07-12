const { Model, DataTypes, Sequelize } = require('sequelize')

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
}

class Movie extends Model {
  static associate(models) {
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
