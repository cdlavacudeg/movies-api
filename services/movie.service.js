const { models } = require('../libs/sequelize')

class MovieService {
  async find() {
    const movies = await models.Movie.findAll({
      include: ['gender', 'characters'],
    })
    return movies
  }
}

module.exports = MovieService
