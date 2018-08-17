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
const Status = require('./src/routes/status')
const Documents = require('./src/routes/document')

app.use('/employee', Employee)
app.use('/employees', Employee)
app.use('/role', Role)
app.use('/roles', Role)
app.use('/status', Status)
app.use('/document', Documents)
app.use('/documents', Documents)

app.listen(3000)