const mongoose = require('mongoose')
const collectionName = 'employees'
const schemaName = 'Employee'
const schema = require('./schema')
module.exports = mongoose.model(schemaName,schema,collectionName)