const express = require('express')
const response = require('./../utils/responses')
const CharacterService = require('./../services/character.service')

const router = express.Router()
const service = new CharacterService()

router.get('/', async (req, res, next) => {
  try {
    const query = req.query
    const characters = await service.find(query)
    response.success(req, res, 'API get - list of characters', {
      character: characters,
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const character = await service.findOne(id)
    response.success(req, res, 'API get - character details ', { character })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
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
})

router.patch('/:id', async (req, res, next) => {
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
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const characterDeleted = await service.delete(id)
    response.success(req, res, 'API delete - character deleted', {
      character: characterDeleted,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
