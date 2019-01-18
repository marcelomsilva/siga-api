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
    let list = [];
    Absence.find()
    .then(absences => {
        if(!absences){
            res.sendStatus(404);
        }else{
            list = absences.sort((obj1,obj2) => {
                if (obj1.event.date < obj2.event.date) return 1;
                if (obj1.event.date > obj2.event.date) return -1;
              });
            return res.status(200).json(list);
        }
    })
    .catch(error => {
        res.status(400).json({error:error});
    });
}

function getAllActive(req,res) {
    let Absence = db.Absence;
    let list = [];
    Absence.find({isCanceled: false})
    .then(absences => {
        if(!absences){
            res.sendStatus(404);
        }else{
            list = absences.sort((obj1,obj2) => {
                if (obj1.event.date < obj2.event.date) return 1;
                if (obj1.event.date > obj2.event.date) return -1;
              });
            return res.status(200).json(list);
        }
    })
    .catch(error => {
        res.status(400).json({error:error});
    });
}

function getAllByDepartmentId(req,res){
    let Absence = db.Absence;
    let list = [];
    Absence.find({"employee.department._id":req.params.id, isCanceled:false})
        .then(absences => {
            if(!absences){
                res.sendStatus(404);                
            }else{
                list = absences.sort((obj1,obj2) => {
                    if (obj1.event.date < obj2.event.date) return 1;
                    if (obj1.event.date > obj2.event.date) return -1;
                  });                  
                return res.status(200).json(list);                
            } 
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

function getAllCanceled(req,res) {
    let Absence = db.Absence;
    let list = [];
    Absence.find({isCanceled: true})
    .then(absences => {
        if(!absences){
            res.sendStatus(404);
        }else{
            list = absences.sort((obj1,obj2) => {
                if (obj1.event.date < obj2.event.date) return 1;
                if (obj1.event.date > obj2.event.date) return -1;
              });
            return res.status(200).json(list);
        } 
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
    let list = [];
    Absence.find({"employee._id":req.params.id, isCanceled:false})
        .then(absences => {
            if(!absences){
                res.sendStatus(404);
            }else{
                list = absences.sort((obj1,obj2) => {
                    if (obj1.event.date < obj2.event.date) return 1;
                    if (obj1.event.date > obj2.event.date) return -1;
                  });
                return res.status(200).json(list);
            } 
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
                    documents.push(res.event.document);
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
                    documents.push(res.event.document);
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
    Absence.find({"employee._id":req.params.id,isCanceled:false,isUnjustified:true})
        .then(absences => {
            if(!absences){
                res.sendStatus(404);
            }else{
                return res.status(200).json(absences.length);
            }
        })
        .catch(error => {
            return res.status(400).json(error);
        })
}

router.get('', getAll)
router.get('/:id', getById)
router.post('/register', register)
router.post('/update/:id', updateById)
router.post('/cancel/:id', cancelById)
router.get('/get/active', getAllActive)
router.get('/get/canceled', getAllCanceled)
router.get('/employee/:id', getByEmployeeId)
router.get('/documents/:id', getDocumentsByAbsenceId)
router.get('/unjustified/:id', getUnjustifiedByEmployeeId)
router.get('/get/department/:id', getAllByDepartmentId)
router.get('/documents/employee/:id', getDocumentsByEmployeeId)


module.exports = router