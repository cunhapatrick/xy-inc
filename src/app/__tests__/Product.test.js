const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const Product = require('../models/Product')
const Faker = require('faker')

let mongoServer
let name = Faker.commerce.productName()

const description = Faker.lorem.text()
const price = Faker.commerce.price()
const category = Faker.commerce.department()

const obj = {
  name,
  description,
  price,
  category
}

beforeAll(async () => {
  mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getConnectionString()
  await mongoose.connect(mongoUri, {}, (err) => {
    if (err) console.error(err)
  })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Product mongodb collection CRUD test', () => {
  it('Should count 0 documents', async () => {
    const cnt = await Product.count()
    expect(cnt).toEqual(0)
  })

  it('Should insert one product and have one document', async () => {
    const product = await Product.create(obj)
    const cnt = await Product.count()

    expect(cnt).toEqual(1)
    expect(product.name).toEqual(name)
  })

  it('Should update the name field of one document', async () => {
    name = Faker.commerce.productName()
    const product = await Product.updateOne({}, { name })
    expect(product.nModified).toEqual(1)
  })

  it('Should find the document by it`s category', async () => {
    const product = await Product.findOne({ category })
    expect(product.name).toEqual(name)
  })

  it('Should delete the document', async () => {
    const product = await Product.deleteOne({ category })
    expect(product.ok).toEqual(1)
  })
})
