const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  qtd: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
})

productSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Product', productSchema)
