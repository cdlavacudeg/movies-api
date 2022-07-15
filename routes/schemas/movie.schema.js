const { models } = require('./../../libs/sequelize')
const {
  uniqueInModelByField,
  existsInModelById,
} = require('./../../utils/db-validator')

const createMovieSchema = {
  image: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'image is required',
    },
  },
  title: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'title is required',
    },
  },
  createdAt: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Created at is required',
    },
    isISO8601: {
      errorMessage: 'Created at must be a date in format ISO 8601',
    },
  },
  calification: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'calification is required',
    },
    isInt: {
      errorMessage: 'Calification must be an int',
    },
  },
  genderId: {
    in: ['body'],
    isInt: {
      if: (value) => {
        return value != null
      },
      errorMessage: 'GenderId must be an int',
      bail: true,
    },
    custom: {
      options: (genderId) => existsInModelById(models.Gender, genderId),
    },
  },
  gender: {
    in: ['body'],
    isObject: {
      if: (value) => value != null,
      errorMessage: 'gender must be an Object',
    },
    optional: true,
    custom: {
      options: (gender) => {
        // gender.name and gender.image are required
        if (!gender.name) {
          return Promise.reject('gender name is required')
        }

        if (!gender.image) {
          return Promise.reject('gender image is required')
        }

        return uniqueInModelByField(models.Gender, 'name', gender.name)
      },
    },
  },
}

const updateMovieSchema = {
  createdAt: {
    in: ['body'],
    isISO8601: {
      if: (date) => date != null,
      errorMessage: 'Created at must be a date in format ISO 8601',
    },
  },
  calification: {
    in: ['body'],
    isInt: {
      if: (calification) => calification != null,
      errorMessage: 'Calification must be an int',
    },
  },
  genderId: {
    in: ['body'],
    isInt: {
      if: (genderId) => genderId != null,
      errorMessage: 'GenderId must be an int',
      bail: true,
    },
    custom: {
      options: (genderId) => existsInModelById(models.Gender, genderId),
    },
  },
}

const idMovieSchema = {
  id: {
    in: ['params'],
    isInt: {
      if: (id) => id != null,
      errorMessage: 'Movie id must be an int',
      bail: true,
    },
    custom: {
      options: (id) => existsInModelById(models.Movie, id),
    },
  },
}

module.exports = { createMovieSchema, updateMovieSchema, idMovieSchema }
