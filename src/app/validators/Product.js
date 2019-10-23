const joi = require('joi')

module.exports = {
  body: {
    name: joi
      .string()
      .required(),
    description: joi
      .string()
      .required(),
    qtd: joi
      .number()
      .required()
  }
}
