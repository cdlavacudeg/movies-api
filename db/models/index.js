const { Movie, MovieSchema } = require('./movie.model')
const { Character, CharacterSchema } = require('./character.model')
const { Gender, GenderSchema } = require('./gender.model')
const {
  MovieCharacter,
  MovieCharacterSchema,
} = require('./movie-character.model')
function setupModels(sequelize) {
  Movie.init(MovieSchema, Movie.config(sequelize))
  Character.init(CharacterSchema, Character.config(sequelize))
  MovieCharacter.init(MovieCharacterSchema, MovieCharacter.config(sequelize))
  Gender.init(GenderSchema, Gender.config(sequelize))

  Movie.associate(sequelize.models)
  Character.associate(sequelize.models)
  Gender.associate(sequelize.models)
}

module.exports = setupModels
