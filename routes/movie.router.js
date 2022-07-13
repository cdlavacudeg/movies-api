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

router.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const newMovie = await service.create(body)
    res.status(201).json(newMovie)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const movieUpdated = await service.update(id, body)
    res.json(movieUpdated)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const movieDeleted = await service.delete(id)
    res.json(movieDeleted)
  } catch (error) {
    next(error)
  }
})
module.exports = router
