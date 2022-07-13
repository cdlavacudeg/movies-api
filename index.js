const express = require('express')
const cors = require('cors')
const { config } = require('./config/config')
const { models } = require('./libs/sequelize')

const app = express()
const port = config.port

//CORS
app.use(cors())

//Parse JSON
app.use(express.json())

//Basic routes

app.get('/', (req, res) => {
  res.send('Welcome to this movie API')
})

app.get('/movies', async (req, res) => {
  const movies = await models.Movie.findAll({
    include: ['gender', 'characters'],
  })
  res.json(movies)
})

app.get('/characters', async (req, res) => {
  const movies = await models.Character.findAll({
    include: ['movies'],
  })
  res.json(movies)
})

app.get('/gender', async (req, res) => {
  const gender = await models.Gender.findAll({
    include: ['movies'],
  })
  res.json(gender)
})
app.use('*', (req, res) => {
  res.send('Page not found')
})

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
