'use strict';
const express = require('express')
const router = express.Router()
const db = require('../db/index')

// Register New Department
function register(req,res) {
    let Department = db.Department;
    let department = new Department(req.body);
    department.validate()
        .then(() => { department.save() })
        .then(() => {
            res.status(200).json({id:department._id});
        })
        .catch(error => {
            res.status(400).json({error:error});
        });
}

// Get All Departments
function getAll(req,res) {
    let Department = db.Department;
    Department.find()
    .then(departments => {
        if(!departments) res.sendStatus(400);
        else return res.status(200).json(departments);
    })
    .catch(error => {
        res.status(400).json({error:error});
    });
}

// Get All Departments - Active
function getAllActive(req,res) {
    let Department = db.Department;
    Department.find({isActive:true})
    .then(departments => {
        if(!departments) res.sendStatus(400);
        else return res.status(200).json(departments);
    })
    .catch(error => {
        res.status(400).json({error:error});
    });
}

function getById(req,res) {
    let Department = db.Department;
    Department.findById(req.params.id)
        .then(department => {
            if(!department) res.sendStatus(404);
            else return res.status(200).json(department);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

function getByName(req,res){
    let Department = db.Department;
    Department.find({name:req.params.name})
        .then(department => {
            if(!department) res.status(404).json(false);
            else return res.status(200).json(department);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

function updateById(req,res) {
    let Department = db.Department;
    Department.findByIdAndUpdate(req.params.id,req.body)
        .then(department => {
            if(!department) res.sendStatus(404);
            else return res.status(200).json(department);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

router.get('', getAll)
router.get('/get/active', getAllActive)
router.get('/:id', getById)
router.get('/get/:name', getByName)
router.post('/register', register)
router.post('/update/:id', updateById)



module.exports = router