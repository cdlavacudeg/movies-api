const express = require('express')
const MovieService = require('./../services/movie.service')

const router = express.Router()
const service = new MovieService()

router.get('/', async (req, res, next) => {
  try {
    const movies = await service.find(req.query)
    res.json(movies)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const movie = await service.findOne(id)
    res.json(movie)
  } catch (error) {
    next(error)
  }
})

module.exports = router
