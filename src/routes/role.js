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
    let list = [];
    Role.find()
        .then(roles => {
            if(!roles){
                res.sendStatus(404);
            }else{
                list = roles.sort(function(a,b) {
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                });
                return res.status(200).json(list);
            } 
        }
    );
}

// Get all Roles
function getAllActive(req,res) {
    let Role = db.Role;
    let list = [];
    Role.find({isActive:true})
        .then(roles => {
            if(!roles){
                res.sendStatus(404);
            }else{
                list = roles.sort(function(a,b) {
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                });
                return res.status(200).json(list);
            }
        }
    );
}

// Get a Role by Id
function getById(req,res) {
    let Role = db.Role;
    Role.findById(req.params.id)
        .then(role => {
            if(!role) res.sendStatus(404);
            else return res.status(200).json(role);
        });
}

function getByName(req,res){
    let Role = db.Role;
    Role.find({name:req.params.name})
        .then(role => {
            if(!role) res.status(404).json(false);
            else return res.status(200).json(role);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

function updateById(req,res) {
    let Role = db.Role;
    Role.findByIdAndUpdate(req.params.id,req.body)
        .then(role => {
            if(!role) res.sendStatus(404);
            else return res.status(200).json(role);
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