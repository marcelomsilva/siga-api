'use strict';
const express = require('express')
const router = express.Router()
const db = require('../db/index')

function register(req,res){
    let DepartmentRole = db.DepartmentRole;
    let departmentRole = new DepartmentRole(req.body);
    departmentRole.validate()
        .then(() => departmentRole.save())
        .then(() => {
            return res.status(200).json({id:absence._id});
        })
        .catch(error => {
            return res.status(400).json({error:error});
        });
}

function getById(req,res){
    let Absence = db.Absence;
    Absence.findById(req.params.id)
        .then(absence => {
            if(!absence) res.sendStatus(404);
            else return res.status(200).json(absence);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

router.get('/:id', register)
router.post('/register', register)

module.exports = router