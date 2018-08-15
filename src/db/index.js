'use strict';
const mongoose = require('mongoose')
const urlDb = 'mongodb://localhost:27017/siga'
mongoose.connect(urlDb,{useNewUrlParser: true})
mongoose.Promise = Promise

const Employee = require('./models/employee')
const Role = require('./models/role')

module.exports = {
    Employee: Employee,
    Role: Role
}

mongoose.connection.once('open',()=>{
    console.log('connected');
})

