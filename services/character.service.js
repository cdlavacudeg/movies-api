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

    const { movie } = query
    if (movie) {
      options.include.push({
        model: models.Movie,
        as: 'movies',
        where: {
          id: movie,
        },
      })
    }
    const characters = await models.Character.findAll(options)
    return characters
  }
  async findOne(id) {
    const character = await models.Character.findByPk(id, {
      include: [
        {
          model: models.Movie,
          attributes: ['id', 'title', 'genderId'],
          through: {
            model: models.MovieCharacter,
            attributes: [],
          },
          as: 'movies',
        },
      ],
    })
    return character
  }

  async create(data) {
    const newCharacter = await models.Character.create(data)
    data.moviesId.map(async (id) => {
      await models.MovieCharacter.create({
        movieId: id,
        characterId: newCharacter.dataValues.id,
      })
    })
    return newCharacter
  }

  async update(id, changes) {
    const character = await models.Character.findByPk(id)
    const updatedCharacter = await character.update(changes)
    if (changes.moviesId) {
      await models.MovieCharacter.destroy({
        where: {
          characterId: character.dataValues.id,
        },
      })

      changes.moviesId.map(async (id) => {
        await models.MovieCharacter.create({
          movieId: id,
          characterId: character.dataValues.id,
        })
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
