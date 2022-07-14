const { validationResult } = require('express-validator')
const response = require('./../../utils/responses')
//Validate all fields in request
const validateField = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return response.error(
      req,
      res,
      errors.array().map((e) => e.msg),
      400
    )
  }
  next()
}

module.exports = { validateField }
