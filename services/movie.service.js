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
    if (data.genderId && data.gender) {
      delete data.gender
    }
    const options = {}
    if (data.gender) {
      options.include = ['gender']
    }
    const newMovie = await models.Movie.create(data, options)
    return newMovie
  }

  async update(id, changes) {
    const movie = await models.Movie.findByPk(id)
    const updatedMovie = await movie.update(changes)
    return updatedMovie
  }

  async delete(id) {
    const movie = await models.Movie.findByPk(id)
    await movie.destroy()
    return movie
  }
}

module.exports = MovieService
