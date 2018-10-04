'use strict';
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Employee = require('../employee/index')
const Event = require('../event/index')
const User = require('../user/index')
const SchemaEmployee = mongoose.model('Employee').schema
const SchemaEvent = mongoose.model('Event').schema
const SchemaUser = mongoose.model('User').schema
const schema = Schema({
    employee: SchemaEmployee,
    event: SchemaEvent,
    user: SchemaUser,
    isCanceled: Boolean,
    createdAt: Date
});
module.exports = schema;