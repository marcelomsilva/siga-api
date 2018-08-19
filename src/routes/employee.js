'use strict';
const express = require('express')
const router = express.Router()
const db = require('../db/index')

//Register new Employee//
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

//Get All Employees
function getAll(req,res) {
    let Employee = db.Employee;
    Employee.find()
        .then(employees => {
            if(!employees) res.sendStatus(404);
            else return res.status(200).json(employees);
        });
}

// Get Employee By Id
function getById(req,res) {
    let Employee = db.Employee;
    Employee.findById(req.params.id)
    .then(employee => {
        if(!employee) res.sendStatus(404);
        else return res.status(200).json(employee);
    });
}

function updateById(req,res) {
    let Employee = db.Employee;
    Employee.findByIdAndUpdate(req.params.id,req.body)
    .then(employee => {
        if(!employee) res.sendStatus(404);
        else return res.status(200).json(employee);
    });
}


router.post('/register', register)
router.get('', getAll)
router.get('/:id', getById)
router.post('/:id', updateById)

module.exports = router