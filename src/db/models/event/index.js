'use strict';
const mongoose = require('mongoose')
const collectionName = 'events'
const schemaName = 'Event'
const schema = require('./schema')
module.exports = mogoose.model(schemaName,schema,collectionName);