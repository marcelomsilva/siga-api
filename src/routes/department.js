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

router.post('/register', register)
router.get('', getAll)

module.exports = router