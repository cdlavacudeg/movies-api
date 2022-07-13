const express = require('express')
const CharacterService = require('./../services/character.service')

const router = express.Router()
const service = new CharacterService()

router.get('/', async (req, res, next) => {
  try {
    const movies = await service.find()
    res.json(movies)
  } catch (error) {
    next(error)
  }
})

module.exports = router
