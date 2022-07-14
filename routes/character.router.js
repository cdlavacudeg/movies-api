const express = require('express')
const CharacterService = require('./../services/character.service')

const router = express.Router()
const service = new CharacterService()

router.get('/', async (req, res, next) => {
  try {
    const query = req.query
    const movies = await service.find(query)
    res.json(movies)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const character = await service.findOne(id)
    res.json(character)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = req.body
    const newCharacter = await service.create(body)
    res.status(201).json(newCharacter)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const characterUpdated = await service.update(id, body)
    res.json(characterUpdated)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const characterDeleted = await service.delete(id)
    res.json(characterDeleted)
  } catch (error) {
    next(error)
  }
})

module.exports = router
