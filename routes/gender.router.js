const express = require('express')
const { models } = require('../libs/sequelize')

const router = express.Router()

router.get('/', async (req, res) => {
  const gender = await models.Gender.findAll({
    include: ['movies'],
  })
  res.json(gender)
})

module.exports = router
