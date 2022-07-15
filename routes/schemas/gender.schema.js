const { models } = require('./../../libs/sequelize')
const { existsInModelById } = require('./../../utils/db-validator')

const createGenderSchema = {
  image: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'image is required',
    },
  },
  name: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'name is required',
    },
  },
}

const idGenderSchema = {
  id: {
    in: ['params'],
    isInt: {
      if: (id) => id != null,
      errorMessage: 'Gender id must be an int',
      bail: true,
    },
    custom: {
      options: (id) => existsInModelById(models.Gender, id),
    },
  },
}

module.exports = { createGenderSchema, idGenderSchema }
