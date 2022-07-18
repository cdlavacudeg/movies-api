const { models } = require('../libs/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { config } = require('./../config/config')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

  signToken(user) {
    const payload = { sub: user.id, email: user.email }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1d' })
    return { user, token }
  }

  async sendMail(email) {
    const msg = {
      to: email, // Change to your recipient
      from: 'cristianlav10@gmail.com', // Change to your verified sender
      subject: 'User registration Successfull',
      text: 'Congratulations, your user has been successfully created',
    }

    const response = sgMail.send(msg)
    return response
  }
}

module.exports = UserService
