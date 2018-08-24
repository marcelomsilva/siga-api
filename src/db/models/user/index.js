const mongoose = require('mongoose')
const collectionName = 'users'
const schemaName = 'User'
const schema = require('./schema')
module.exports = mongoose.model(schemaName,schema,collectionName)