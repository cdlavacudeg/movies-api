const express = require('express')
const cors = require('cors')
const { config } = require('./config/config')
const routerApi = require('./routes')

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
  res.send('Page not found')
})

app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
