'use strict';
const mongoose = require('mongoose')
const urlDb = 'mongodb://localhost:27017/siga'
mongoose.connect(urlDb,{useNewUrlParser: true})
mongoose.Promise = Promise

const Employee = require('./models/employee')
const Role = require('./models/role')
const Status = require('./models/status')
const Document = require('./models/document')

module.exports = {
    Employee: Employee,
    Role: Role,
    Status: Status,
    Document: Document
}

mongoose.connection.once('open',()=>{
    console.log('connected');
})

