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

function getByEmployeeId(req,res){
    let Absence = db.Absence;
    Absence.find({"employee._id":req.params.id})
        .then(absences => {
            if(!absences) res.sendStatus(404);
            else return res.status(200).json(absences);
        })
        .catch(error => {
            return res.status(400).json(error);
        })
}

function getDocumentsByEmployeeId(req,res){
    let Absence = db.Absence;
    let documents = [];
    Absence.find({"employee._id":req.params.id,isCanceled:false})
        .then(absences => {
            if(!absences){
                res.sendStatus(404);
            }else{
                absences.forEach(res => {
                    res.events.forEach(res =>{
                            documents.push(res.document);
                    });
                });
                return res.status(200).json(documents);
            }
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

function getDocumentsByAbsenceId(req,res){
    let Absence = db.Absence;
    let documents = [];
    Absence.find({_id:req.params.id})
        .then(absences => {
            if(!absences){
                res.sendStatus(404);
            }else{
                absences.forEach(res => {
                    res.events.forEach(res => {
                        documents.push(res.document);
                    });
                });
                return res.status(200).json(documents);
            }
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}


function getUnjustifiedByEmployeeId(req,res){
    let amountUnjustified = 0;
    let Absence = db.Absence;
    Absence.find({"employee._id":req.params.id})
        .then(absences => {
            if(!absences){
                res.sendStatus(404);
                console.log('dda');
            }else{
                absences.forEach(res => {
                    if(res.isCanceled != true){
                        res.events.forEach(event => {
                            if(event.isUnjustified == true){
                                amountUnjustified++;
                            }
                        });
                    }
                });
                return res.status(200).json(amountUnjustified);
            }
        })
        .catch(error => {
            return res.status(400).json(error);
        })
}

function getByDocumentId(req,res){
    let Absence = db.Absence;
    req.body.absence.find({})
}

router.get('', getAll)
router.get('/:id', getById)
router.post('/register', register)
router.post('/update/:id', updateById)
router.post('/cancel/:id', cancelById)
router.get('/employee/:id', getByEmployeeId)
router.get('/documents/:id', getDocumentsByAbsenceId)
router.get('/documents/employee/:id', getDocumentsByEmployeeId)
router.get('/unjustified/:id', getUnjustifiedByEmployeeId)


module.exports = router