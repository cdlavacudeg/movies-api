const express = require('express')
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

module.exports = router
