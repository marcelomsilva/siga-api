'use strict';
const express = require('express')
const app = new express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const Employee = require('./src/routes/employee')

app.use('/employee', Employee)

app.listen(3000)