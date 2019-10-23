const redis = require('redis')
const { REDIS_PORT, REDIS_HOST } = process.env

module.exports = redis.createClient(REDIS_PORT, REDIS_HOST)
