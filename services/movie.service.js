const { models } = require('../libs/sequelize')

class MovieService {
  async find(query) {
    const options = {
      include: ['gender'],
      attributes: ['id', 'image', 'title', 'createdAt'],
      where: {},
      order: [],
    }
    const { name: title } = query
    if (title) {
      options.where.title = title
    }

    const { genre: gender } = query
    if (gender) {
      options.where.genderId = gender
    }

    const { order } = query
    if (order) {
      options.order.push(['createdAt', order])
    }
    console.log(order)
    const movies = await models.Movie.findAll(options)
    return movies
  }

  async findOne(id) {
    const movie = await models.Movie.findByPk(id, {
      include: ['gender', 'characters'],
      attributes: { exclude: ['genderId'] },
    })
    return movie
  }

  async create(data) {
    const newMovie = await models.Movie.create(data)
    return newMovie
  }
}

module.exports = MovieService
