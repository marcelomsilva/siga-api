'use strict';
const express = require('express')
const app = new express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const Employee = require('./src/routes/employee')
const Role = require('./src/routes/role')

app.use('/employee', Employee)
app.use('/role', Role)
app.use('/roles', Role)

app.listen(3000)