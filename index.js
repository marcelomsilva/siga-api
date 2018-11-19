'use strict';
const express = require('express')
const app = new express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200',],
    credentials:true
}));

const Employee = require('./src/routes/employee')
const Role = require('./src/routes/role')
const Status = require('./src/routes/status')
const Documents = require('./src/routes/document')
const Absence = require('./src/routes/absence')
const Department = require('./src/routes/department')
const User = require('./src/routes/user')
const Login = require('./src/routes/login')
const Log = require('./src/routes/log')
const DepartmentRole = require('./src/routes/departmentRole')

app.use('/employee', Employee)
app.use('/employees', Employee)
app.use('/role', Role)
app.use('/roles', Role)
app.use('/status', Status)
app.use('/document', Documents)
app.use('/documents', Documents)
app.use('/absence', Absence)
app.use('/absences', Absence)
app.use('/department', Department)
app.use('/departments', Department)
app.use('/users', User)
app.use('/user', User)
app.use('/login', Login)
app.use('/log', Log)
app.use('/logs', Log)
app.use('/departmentRole', DepartmentRole)

app.listen(3000)