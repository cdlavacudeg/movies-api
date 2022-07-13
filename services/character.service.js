const { models } = require('../libs/sequelize')

class CharacterService {
  async find() {
    const characters = await models.Character.findAll({
      include: ['movies'],
    })
    return characters
  }
}

module.exports = CharacterService
