'use strict';
const mongoose = require('mongoose')
const collectionName = 'departments'
const schemaName = 'Department'
const schema = require('./schema')
module.exports = mongoose.model(schemaName,schema,collectionName)