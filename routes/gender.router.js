const express = require('express')
const response = require('./../utils/responses')
const GenderService = require('./../services/gender.service')
const service = new GenderService()
const router = express.Router()
const {
  createGenderSchema,
  idGenderSchema,
} = require('./schemas/gender.schema')
const { validateField } = require('./schemas/validate-field')
const { checkSchema } = require('express-validator')

router.get('/', async (req, res, next) => {
  try {
    const gender = await service.find(req.query)
    response.success(req, res, 'API get - list of genders', { gender })
  } catch (error) {
    next(error)
  }
})

router.get(
  '/:id',
  checkSchema(idGenderSchema),
  validateField,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const gender = await service.findOne(id)
      response.success(req, res, 'API get - gender details ', { gender })
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/',
  checkSchema(createGenderSchema),
  validateField,
  async (req, res, next) => {
    try {
      const body = req.body
      const newGender = await service.create(body)
      response.success(
        req,
        res,
        'API post - gender created',
        { gender: newGender },
        201
      )
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  '/:id',
  checkSchema(idGenderSchema),
  validateField,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const genderUpdated = await service.update(id, body)
      response.success(req, res, 'API patch - gender updated', {
        gender: genderUpdated,
      })
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  checkSchema(idGenderSchema),
  validateField,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const genderDeleted = await service.delete(id)
      response.success(req, res, 'API delete - gender deleted', {
        gender: genderDeleted,
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
