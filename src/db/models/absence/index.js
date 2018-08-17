'use strict';
const mongoose = require('mongoose')
const collectionName = 'absences'
const schemaName = 'Abesence'
const schema = require('./schema')
module.exports = mongoose.model(schemaName,schema,collectionName)