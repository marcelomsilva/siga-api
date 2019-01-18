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
    let list = [];
    Employee.find()
        .then(employees => {
            if(!employees){
                res.sendStatus(404);
            }else{
                list = employees.sort((obj1, obj2) => {
                    if(obj1.name > obj2.name) return 1;
                    if(obj1.name < obj2.name) return -1;
                });
                return res.status(200).json(list);
            } 
        });
}

// Get Employee By Id
function getById(req,res) {
    let Employee = db.Employee;
    Employee.findById(req.params.id)
    .then(employee => {
        if(!employee) res.sendStatus(404);
        else return res.status(200).json(employee);
    })
    .catch(error => {
        return res.status(400).json(error);
    });
}

function getByDepartmentId(req,res) {
    let Employee = db.Employee;    
    let list = [];
    Employee.find({"department._id":req.params.id})
    .then(employees => {
        if(!employees){
            res.sendStatus(404);            
        }else{
            list = employees.sort((obj1, obj2) => {
                if(obj1.name > obj2.name) return 1;
                if(obj1.name < obj2.name) return -1;
            });
            return res.status(200).json(list);
        }
    })
    .catch(error => {
        res.status(500).json(error);        
    });
}

// Get Employee By Registration property
function getByRegistration(req,res) {
    let Employee = db.Employee;
    Employee.find({registration:req.params.id})
        .then(employee => {
            if(!employee) return res.status(404).send(null);
            else return res.status(200).json(employee);
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

//Update Employee by Id
function updateById(req,res) {
    let Employee = db.Employee;
    Employee.findByIdAndUpdate(req.params.id,req.body)
    .then(employee => {
        if(!employee) res.sendStatus(404);
        else return res.status(200).json(employee);
    });
}

router.get('', getAll)
router.get('/:id', getById)
router.post('/register', register)
router.post('/update/:id', updateById)
router.get('/registration/:id', getByRegistration)
router.get('/get/department/:id', getByDepartmentId)


module.exports = router