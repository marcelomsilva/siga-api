'use strict';
const mongoose = require('mongoose')
const Department = require('../department/index')
const SchemaDepartment = mongoose.model('Department').schema
const Schema = mongoose.Schema
const schema = Schema({
    name: {
        type: String,
        require
    }
});
module.exports = schema;