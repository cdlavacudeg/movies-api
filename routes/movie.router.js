const express = require('express')
const MovieService = require('./../services/movie.service')

const router = express.Router()
const service = new MovieService()

router.get('/', async (req, res, next) => {
  try {
    const movies = await service.find()
    res.json(movies)
  } catch (error) {
    next(error)
  }
})

module.exports = router
