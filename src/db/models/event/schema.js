'use strict';
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Document = require('../document/index')
const SchemaDocument = mongoose.model('Document').schema
const schema = Schema({
    date: {
        type: Date,
        require
    },
    document: SchemaDocument
});
module.exports = schema;