const existsInModelById = async (Model, id) => {
  const element = await Model.findByPk(id)
  if (!element) {
    return Promise.reject(`${Model.getTableName()}:Id ${id} does not exists`)
  }
  return true
}

const uniqueInModelByField = async (Model, fieldname = '', fieldvalue) => {
  let field = {}
  field[`${fieldname}`] = fieldvalue
  const element = await Model.findOne({
    where: field,
  })
  if (element) {
    const id = element.dataValues.id
    throw new Error(
      `${Model.getTableName()}(${fieldname}):${fieldvalue} alredy exists with id ${id} `
    )
  }
}

module.exports = { existsInModelById, uniqueInModelByField }
