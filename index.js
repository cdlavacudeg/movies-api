const express = require('express')
const cors = require('cors')
const { config } = require('./config/config')
const routerApi = require('./routes')
const {
  logErrors,
  errorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler')
const response = require('./utils/responses')

const app = express()
const port = config.port

//CORS
app.use(cors())

//Parse JSON
app.use(express.json())

//Routes
app.get('/', (req, res) => {
  res.send('Welcome to this movie API')
})

routerApi(app)

app.use('*', (req, res) => {
  response.error(req, res, 'Page not found', 400)
})

app.use(logErrors)
app.use(ormErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
