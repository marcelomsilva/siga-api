'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Department = require('../role/index')
const SchemaDepartment = mongoose.model('Department').schema
const Role = require('../role/index')
const SchemaRole = mongoose.model('Role').schema
const schema = Schema({
    department: SchemaDepartment,
    roles: [SchemaRole]
});

module.exports = schema;