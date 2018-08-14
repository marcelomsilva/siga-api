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
        type: Schema.Types.String,
        ref: 'Role'
    },
    isActive: {
        type: Boolean,
        require
    }
});

module.exports = schema;