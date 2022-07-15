const { models } = require('../libs/sequelize')

class GenderService {
  async find() {
    const genders = await models.Gender.findAll()
    return genders
  }

  async findOne(id) {
    const gender = await models.Gender.findByPk(id, {
      include: ['movies'],
    })
    return gender
  }

  async create(data) {
    const newGender = await models.Gender.create(data)
    return newGender
  }

  async update(id, changes) {
    const gender = await models.Gender.findByPk(id)
    const updatedGender = await gender.update(changes)
    return updatedGender
  }

  async delete(id) {
    const gender = await models.Gender.findByPk(id)
    await gender.destroy()
    return gender
  }
}

module.exports = GenderService
