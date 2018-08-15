'use strict';
const express = require('express')
const router = express.Router()
const db = require('../db/index')

function register(req,res) {
    let Employee = db.Employee;
    let employee = new Employee(req.body);
    employee.validate()
        .then(() => employee.save())
        .then(() =>{
            return res.status(201).json({ id: employee._id });
        })
        .catch(error =>{
            res.status(400).json({ error: error});
        });
}

router.post('/register', register)

module.exports = router