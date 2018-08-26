'use strict';
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = Schema({
    name: {
        type: String,
        require
    },
    branchLine: {
        type: Number,
    }
});
module.exports = schema