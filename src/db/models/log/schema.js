'use strict';
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('../user/index')
const UserSchema = mongoose.model('User').schema
const schema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        require
    },
    login: Date,
    logout: Date
});
module.exports = schema