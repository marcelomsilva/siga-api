'use strict';
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Role = require('../role/index')
const Status = require('../status/index')
const Department = require('../department/index')
const RoleSchema = mongoose.model('Role').schema
const StatusSchema = mongoose.model('Status').schema
const DepartmentSchema = mongoose.model('Department').schema
const schema = Schema({
    registration: {
        type: Number,
        require
    },
    name: {
        type: String,
        require
    },
    role: RoleSchema,
    status: StatusSchema,
    department: DepartmentSchema,
    createdAt: Date
});
module.exports = schema;