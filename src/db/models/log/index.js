const mongoose = require('mongoose')
const schamaName = 'Log'
const collectionName = 'logs'
const schema = require('./schema')
module.exports = mongoose.model(schamaName,schema,collectionName)