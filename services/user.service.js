const { models } = require('../libs/sequelize')
const bcrypt = require('bcrypt')

class UserService {
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10)
    data.password = hash
    const newUser = await models.User.create(data)
    delete newUser.dataValues.password
    return newUser
  }

  async findByEmail(email) {
    const res = await models.User.findOne({
      where: { email },
    })
    return res
  }

  async getUser(email, password) {
    const user = await this.findByEmail(email)
    if (!user) {
      throw new Error('Incorrect email or password')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new Error('Incorrect email or password')
    }
    delete user.dataValues.password
    return user
  }
}

module.exports = UserService
