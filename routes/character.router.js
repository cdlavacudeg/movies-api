const express = require('express')
const response = require('./../utils/responses')
const CharacterService = require('./../services/character.service')

const router = express.Router()
const service = new CharacterService()
const {
  createCharacterSchema,
  updateCharacterSchema,
  idCharacterSchema,
} = require('./schemas/character.schema')
const { validateField } = require('./schemas/validate-field')
const { checkSchema } = require('express-validator')
const passport = require('passport')

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const query = req.query
      const characters = await service.find(query)
      response.success(req, res, 'API get - list of characters', {
        character: characters,
      })
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkSchema(idCharacterSchema),
  validateField,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const character = await service.findOne(id)
      response.success(req, res, 'API get - character details ', { character })
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkSchema(createCharacterSchema),
  validateField,
  async (req, res, next) => {
    try {
      const body = req.body
      const newCharacter = await service.create(body)
      response.success(
        req,
        res,
        'API post - character created',
        { character: newCharacter },
        201
      )
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkSchema(idCharacterSchema),
  checkSchema(updateCharacterSchema),
  validateField,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const characterUpdated = await service.update(id, body)
      response.success(req, res, 'API patch - character updated', {
        character: characterUpdated,
      })
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkSchema(idCharacterSchema),
  validateField,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const characterDeleted = await service.delete(id)
      response.success(req, res, 'API delete - character deleted', {
        character: characterDeleted,
      })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
