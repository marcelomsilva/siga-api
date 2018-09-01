'use strict';
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = Schema({
    name: {
        type: String,
        require
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean,
        require
    }
});
module.exports = schema;