const mongoose = require('mongoose')
const collectionName = 'documents'
const schemaName = 'Document'
const schema = require('./schema')
module.exports = mongoose.model(schemaName,schema,collectionName)