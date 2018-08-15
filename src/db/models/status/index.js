'use strict';
const mongoose = require('mongoose')
const collectionName = 'status'
const schemaName = 'Status'
const schema = require('./schema')
module.exports = mongoose.model(schemaName,schema,collectionName);