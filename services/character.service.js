const { models } = require('../libs/sequelize')

class CharacterService {
  async find(query) {
    const options = {
      attributes: ['id', 'image', 'name'],
      include: [],
      where: {},
    }
    const { name } = query
    if (name) {
      options.where.name = name
    }

    const { age } = query
    if (age) {
      options.attributes.push('age')
      options.where.age = age
    }

    const { movies } = query
    if (movies) {
      options.include.push({
        model: models.Movie,
        as: 'movies',
        where: {
          id: movies,
        },
      })
    }
    const characters = await models.Character.findAll(options)
    return characters
  }
  async findOne(id) {
    const character = await models.Character.findByPk(id, {
      include: ['movies'],
    })
    return character
  }

  async create(data) {
    const newCharacter = await models.Character.create(data)
    await models.MovieCharacter.create({
      movieId: data.movieId,
      characterId: newCharacter.dataValues.id,
    })
    return newCharacter
  }

  async update(id, changes) {
    const character = await models.Character.findByPk(id)
    const updatedCharacter = await character.update(changes)
    if (changes.movieId) {
      await models.MovieCharacter.destroy({
        where: {
          characterId: character.dataValues.id,
        },
      })

      await models.MovieCharacter.create({
        movieId: changes.movieId,
        characterId: character.dataValues.id,
      })
    }
    return updatedCharacter
  }

  async delete(id) {
    const character = await models.Character.findByPk(id)
    await character.destroy()
    return character
  }
}

module.exports = CharacterService
