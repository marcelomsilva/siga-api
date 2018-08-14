const mongoose = require('mongoose')
const urlDb = 'http://localhost/siga'
mongoose.connect(urlDb)
mongoose.Promise = Promise

const Employee = require('../db/models/employee')

module.exports = {
    Employee: Employee
}

mongoose.connection.once('open',()=>{
    console.log('connected');
})

