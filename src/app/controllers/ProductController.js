const Product = require('../models/Product')

class ProductController {
  async index (req, res) {
    try {
      const { page = 1, limit = 10 } = req.query
      const products = await Product.paginate({}, page, limit)
      return res.json(products)
    } catch (err) {
      if (err.path === '_id') return res.status(400).json({ message: 'Invalid Id' })
      else res.status(500).json({ ...err })
    }
  }

  async show (req, res) {
    const { id } = req.params
    try {
      const product = await Product.findById(id)
      return res.json(product)
    } catch (err) {
      if (err.path === '_id') return res.status(400).json({ message: 'Invalid Id' })
      else res.status(500).json({ ...err })
    }
  }

  async store (req, res) {
    try {
      const product = await Product.create(req.body)
      return res.json(product)
    } catch (err) {
      if (err.path === '_id') return res.status(400).json({ message: 'Invalid Id' })
      else res.status(500).json({ ...err })
    }
  }

  async update (req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body)
      return res.json(product)
    } catch (err) {
      if (err.path === '_id') return res.status(400).json({ message: 'Invalid Id' })
      else res.status(500).json({ ...err })
    }
  }

  async destroy (req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id)
      return res.json(product)
    } catch (err) {
      if (err.path === '_id') return res.status(400).json({ message: 'Invalid Id' })
      else res.status(500).json({ ...err })
    }
  }
}

module.exports = new ProductController()
