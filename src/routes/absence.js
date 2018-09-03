'use strict';
const express = require('express')
const router = express.Router()
const db = require('../db/index')

function register(req,res) {
    let Absence = db.Absence;
    let absence = new Absence(req.body);
    absence.validate()
    .then(() => absence.save())
    .then(() => {
        return res.status(200).json({id:absence._id});
    })
    .catch(error => {
        return res.status(400).json({error:error});
    });
}

function getAll(req,res) {
    let Absence = db.Absence;
    Absence.find()
    .then(absences => {
        if(!absences) res.sendStatus(404);
        else return res.status(200).json(absences);
    })
    .catch(error => {
        res.status(400).json({error:error});
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

function updateById(req,res){
    let Absence = db.Absence;
    Absence.findByIdAndUpdate(req.params.id,req.body)
        .then(absence => {
            if(!absence) res.sendStatus(404);
            else return res.status(200).json(absence);
        })
        .catch(error => {
            res.status(400).json(error);
        });
}

function cancelById(req,res){
    let Absence = db.Absence;
    Absence.findByIdAndUpdate(req.params.id,req.body)
        .then(absence => {
            if(!absence) res.sendStatus(404);
            else return res.status(200).json(absence);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

router.get('', getAll)
router.get('/:id', getById)
router.post('/register', register)
router.post('/update/:id', updateById)
router.post('/cancel/:id', cancelById)


module.exports = router