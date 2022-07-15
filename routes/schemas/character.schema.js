const { models } = require('./../../libs/sequelize')
const {
  uniqueInModelByField,
  existsInModelById,
} = require('./../../utils/db-validator')

const createCharacterSchema = {
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
    custom: {
      options: (name) => uniqueInModelByField(models.Character, 'name', name),
    },
  },
  history: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'history is required',
    },
  },
  age: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'age is required',
    },
    isInt: {
      errorMessage: 'age must be an int',
    },
  },
  weight: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'weight is required',
    },
    isFloat: {
      errorMessage: 'weight must be a float',
    },
  },
  moviesId: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'moviesId is required',
    },
    isArray: {
      errorMessage: 'moviesId must be an array',
      bail: true,
    },
  },
  'moviesId.*': {
    custom: {
      options: (movieId) => existsInModelById(models.Movie, movieId),
    },
  },
}

const updateCharacterSchema = {
  name: {
    in: ['body'],
    optional: true,
    custom: {
      options: (name) => uniqueInModelByField(models.Character, 'name', name),
    },
  },
  age: {
    in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'age must be an int',
    },
  },
  weight: {
    in: ['body'],
    optional: true,
    isFloat: {
      errorMessage: 'weight must be a float',
    },
  },
  moviesId: {
    in: ['body'],
    optional: true,
    isArray: {
      errorMessage: 'moviesId must be an array',
      bail: true,
    },
  },
  'moviesId.*': {
    optional: true,
    custom: {
      options: (movieId) => existsInModelById(models.Movie, movieId),
    },
  },
}

const idCharacterSchema = {
  id: {
    in: ['params'],
    isInt: {
      if: (id) => id != null,
      errorMessage: 'Character id must be an int',
      bail: true,
    },
    custom: {
      options: (id) => existsInModelById(models.Character, id),
      bail: true,
    },
  },
}

module.exports = {
  createCharacterSchema,
  updateCharacterSchema,
  idCharacterSchema,
}
