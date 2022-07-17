const express = require('express')
const passport = require('passport')
const UserService = require('./../services/user.service')
const response = require('./../utils/responses')

const service = new UserService()
const router = express.Router()

router.post('/register', async (req, res, next) => {
  try {
    const body = req.body
    const newUser = await service.create(body)
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
})

router.post(
  '/login',
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
