'use strict';
const mongoose = require('mongoose')
//const urlDb = 'mongodb://db:27017/siga'
const urlDb = 'mongodb://localhost:27017/siga'
mongoose.connect(urlDb, {useNewUrlParser: true}).then(() => {
    console.log("Connected")
}).catch(err => {
    console.log(err.message);
});
mongoose.Promise = Promise

const Employee = require('./models/employee')
const Role = require('./models/role')
const Status = require('./models/status')
const Documents = require('./models/document')
const Absence = require('./models/absence')
const User = require('./models/user')
const Department = require('./models/department')
const Log = require('./models/log')

module.exports = {
    Employee: Employee,
    Role: Role,
    Status: Status,
    Document: Documents,
    Absence: Absence,
    User: User,
    Department: Department,
    Log: Log,
}

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open',()=>{
    console.log('connected');
}, 'error',() => {
    console.log("error");
});


