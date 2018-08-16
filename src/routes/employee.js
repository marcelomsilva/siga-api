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

function getAll(req,res) {
    let Employee = db.Employee;
    Employee.find()
        .then(employees => {
            if(!employees) res.sendStatus(404);
            else return res.status(200).json(employees);
        });
}

router.post('/register', register)
router.get('', getAll)

module.exports = router