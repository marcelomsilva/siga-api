'use strict';
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const schema = Schema({
    registration: {
        type: Number,
        require
    },
    name: {
        type: String,
        require
    },
    username: {
        type: String,
        require
    },
    password: {
        type: String,
        require
    },
    isActive: {
        type: Boolean,
        require
    },
    isLeader: {
        type: Boolean,
        require
    },
    isAdmin: {
        type: Boolean,
        require
    }
});
module.exports = schema