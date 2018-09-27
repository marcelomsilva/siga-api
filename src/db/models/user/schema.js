'use strict';
const mongoose = require('mongoose')
const Department = require('../department/index')
const DepartmentSchema = mongoose.model('Department').schema
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
    department: DepartmentSchema,
    isActive: {
        type: Boolean,
        require
    },
    isAdmin: {
        type: Boolean,
        require
    }
});
module.exports = schema