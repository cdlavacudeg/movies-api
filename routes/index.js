const express = require('express')
const movieRouter = require('./movie.router')
const characterRouter = require('./character.router')
const genderRouter = require('./gender.router')
const userRouter = require('./user.router')

function routerApi(app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/movies', movieRouter)
  router.use('/characters', characterRouter)
  router.use('/genders', genderRouter)
  router.use('/auth', userRouter)
}

module.exports = routerApi
