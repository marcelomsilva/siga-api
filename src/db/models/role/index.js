const mongoose = require('mongoose')
const collectionName = 'roles'
const schemaName = 'Role'
const schema = require('./schema')
module.exports = mongoose.model(schemaName,schema,collectionName)