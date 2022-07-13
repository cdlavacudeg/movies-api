const express = require('express')
const { models } = require('../libs/sequelize')

const router = express.Router()

router.get('/', async (req, res) => {
  const movies = await models.Movie.findAll({
    include: ['gender', 'characters'],
  })
  res.json(movies)
})

module.exports = router
