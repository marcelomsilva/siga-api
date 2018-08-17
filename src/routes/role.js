'use strict';
const express = require('express')
const router = express.Router()
const db = require('../db/index')

// Register new Role
function register(req,res) {
    let Role = db.Role;
    let role = new Role(req.body);
    role.validate()
        .then(() => role.save())
        .then(()=>{
            return res.status(201).json({id:role._id});
        })
        .catch(error => {
            return res.status(400).json({error:error});
        });
}

// Get all Roles
function getAll(req,res) {
    let Role = db.Role;
    Role.find()
        .then(roles => {
            if(!roles) res.sendStatus(404);
            else return res.status(200).json(roles);
        }
    );
}

function getById(req,res) {
    let Role = db.Role;
    Role.findById(req.params.id)
        .then(role => {
            if(!role) res.sendStatus(404);
            else return res.status(200).json(role);
        });
}

router.post('/register', register)
router.get('', getAll)
router.get('/:id', getById)

module.exports = router