const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Role = require('../role')
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
        type: Role
    },
    isActive: {
        type: Boolean,
        require
    }
});