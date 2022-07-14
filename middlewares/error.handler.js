const { ValidationError } = require('sequelize')
const response = require('./../utils/responses')

function logErrors(err, req, res, next) {
  console.error(err)
  next(err)
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    response.error(
      req,
      res,
      {
        msg: err.name,
        errors: err.errors,
      },
      409
    )
  }
  next(err)
}

function errorHandler(err, req, res) {
  response.error(req, res, {
    msg: err.message,
    stack: err.stack,
  })
}

module.exports = { logErrors, errorHandler, ormErrorHandler }
