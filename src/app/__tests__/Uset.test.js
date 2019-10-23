const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const User = require('../models/User')
const Faker = require('faker')

let mongoServer
let name = Faker.name.findName()

const email = Faker.internet.email()
const password = Faker.internet.password()

const obj = {
  name,
  email,
  password
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

describe('User mongodb collection CRUD test', () => {
  it('Should count 0 documents', async () => {
    const cnt = await User.count()
    expect(cnt).toEqual(0)
  })

  it('Should insert one User and have one document', async () => {
    const user = await User.create(obj)
    const cnt = await User.count()

    expect(cnt).toEqual(1)
    expect(user.name).toEqual(name)
  })

  it('Should update the name field of one document', async () => {
    name = Faker.name.findName()
    const user = await User.updateOne({}, { name })
    expect(user.nModified).toEqual(1)
  })

  it('Should find the document by it`s email', async () => {
    const user = await User.findOne({ email })
    expect(user.email).toEqual(email.toLowerCase())
  })

  it('Should delete the document', async () => {
    const user = await User.deleteOne({ email })
    expect(user.ok).toEqual(1)
  })
})
