'use strict';
const mongoose = require('mongoose')
const collectionName = 'events'
const schemaName = 'Event'
const schema = require('./schema')
module.exports = mongoose.model(schemaName,schema,collectionName);