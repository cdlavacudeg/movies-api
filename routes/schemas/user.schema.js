const userSchema = {
  email: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'email is required',
      bail: true,
    },
    isEmail: {
      errorMessage: 'Invalid email',
    },
  },
  password: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'password is required',
      bail: true,
    },
    isLength: {
      errarMessage: 'password should be at least 6 chars long',
      options: { min: 6 },
    },
  },
}

module.exports = { userSchema }
