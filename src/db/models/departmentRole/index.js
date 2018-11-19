'use strict';
const mongoose = require('mongoose')
const collectionName = 'departmentroles'
const schemaName = 'DepartmentRole'
const schema = require('./schema')
module.exports = mongoose.model(schemaName,schema,collectionName)