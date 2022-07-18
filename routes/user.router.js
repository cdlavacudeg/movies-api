const express = require('express')
const { checkSchema } = require('express-validator')
const passport = require('passport')
const UserService = require('./../services/user.service')
const response = require('./../utils/responses')

const service = new UserService()
const router = express.Router()

const { userSchema } = require('./schemas/user.schema')
const { validateField } = require('./schemas/validate-field')

router.post(
  '/register',
  checkSchema(userSchema),
  validateField,
  async (req, res, next) => {
    try {
      const body = req.body
      const newUser = await service.create(body)
      await service.sendMail(body.email)
      response.success(
        req,
        res,
        'API post - user created',
        { user: newUser },
        201
      )
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/login',
  checkSchema(userSchema),
  validateField,
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user
      const data = service.signToken(user)
      response.success(req, res, 'User loged in', data, 200)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
