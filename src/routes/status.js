'use strict';
const express = require('express')
const router = express.Router()
const db = require('../db/index')

// Register new Status
function register(req,res) {
    let Status = db.Status;
    let status = new Status(req.body);
    status.validate()
        .then(() => status.save())
        .then(() => {
            return res.status(200).json({id:status._id});
        })
        .catch(error => {
            return res.status(400).json({error:error});
        });
}

// Get all Status
function getAll(req,res) {
    let Status = db.Status;
    Status.find()
        .then(status => {
            if(!status) res.sendStatus(404);
            else return res.status(200).json(status);
        });
}

// Get all Status - Active
function getAllActive(req,res) {
    let Status = db.Status;
    Status.find({isActive:true})
        .then(status => {
            if(!status) res.sendStatus(404);
            else return res.status(200).json(status);
        });
}

function getById(req,res) {
    let Status = db.Status;
    Status.findById(req.params.id)
        .then(status => {
            if(!status) res.sendStatus(404);
            else return res.status(200).json(status);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

function getByName(req,res){
    let Status = db.Status;
    Status.find({name:req.params.name})
        .then(status => {
            if(!status) res.status(404).json(false);
            else return res.status(200).json(status);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

function updateById(req,res) {
    let Status = db.Status;
    Status.findByIdAndUpdate(req.params.id,req.body)
    .then(status => {
        if(!status) res.sendStatus(404);
        else return res.status(200).json(status);
    })
    .catch(error => {
        return res.status(400).json(error);
    });
}

router.get('', getAll)
router.get('/get/active', getAllActive)
router.get('/:id', getById)
router.post('/register', register)
router.get('/get/:name', getByName)
router.post('/update/:id', updateById)


module.exports = router;