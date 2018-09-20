'use strict';
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Document = require('../document/index')
const SchemaDocument = mongoose.model('Document').schema
const schema = Schema({
    date: Date,
    document: SchemaDocument,
    note: String,
    isUnjustified: Boolean
});
module.exports = schema;