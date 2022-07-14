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
      options: (value) => {
        // gender.name and gender.image are required
        if (!value.name) {
          return Promise.reject('gender name is required')
        }
        if (!value.image) {
          return Promise.reject('gender image is required')
        }
        return true
      },
    },
  },
}

module.exports = { createMovieSchema }
