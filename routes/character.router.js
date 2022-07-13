const express = require('express')
const { models } = require('../libs/sequelize')

const router = express.Router()

router.get('/', async (req, res) => {
  const movies = await models.Character.findAll({
    include: ['movies'],
  })
  res.json(movies)
})

module.exports = router
