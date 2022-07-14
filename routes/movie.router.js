const express = require('express')
const { checkSchema } = require('express-validator')
const MovieService = require('./../services/movie.service')
const response = require('./../utils/responses')
const { createMovieSchema } = require('./schemas/movie.schema')
const { validateField } = require('./schemas/validate-field')

const router = express.Router()
const service = new MovieService()

router.get('/', async (req, res, next) => {
  try {
    const movies = await service.find(req.query)
    response.success(req, res, 'API get - list of movies', { movies })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const movie = await service.findOne(id)
    response.success(req, res, 'API get - movie details ', { movie })
  } catch (error) {
    next(error)
  }
})

router.post(
  '/',
  checkSchema(createMovieSchema),
  validateField,
  async (req, res, next) => {
    try {
      const body = req.body
      const newMovie = await service.create(body)
      response.success(req, res, 'API post - movie created', { newMovie }, 201)
    } catch (error) {
      next(error)
    }
  }
)

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const movieUpdated = await service.update(id, body)
    response.success(req, res, 'API patch - movie updated', { movieUpdated })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const movieDeleted = await service.delete(id)
    response.success(req, res, 'API delete - movie deleted', { movieDeleted })
  } catch (error) {
    next(error)
  }
})
module.exports = router
