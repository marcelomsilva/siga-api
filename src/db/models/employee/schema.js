'use strict';
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Role = require('../role/index')
const schema = Schema({
    registration: {
        type: Number,
        require
    },
    name: {
        type: String,
        require
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    status: {
        type: String,
        require
    }
});

module.exports = schema;