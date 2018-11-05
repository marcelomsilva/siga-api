'use strict';
const express = require('express')
const router = express.Router()
const db = require('../db/index')

// Register new Document
function register(req,res) {
    let Document = db.Document;
    let document = new Document(req.body);
    document.validate()
        .then(() => {document.save()})
        .then(() => {
            return res.status(200).json({id:document._id});
        })
        .catch(error => {
            return res.status(400).json({error:error});
        });
}

//Get All Documents
function getAll(req,res) {
    let Document = db.Document;
    Document.find()
    .then(documents => {
        if(!documents) res.sendStatus(404);
        else return res.status(200).json(documents);
    });
}

// Get All Documents - isActive: true
function getAllActive(req,res){
    let Document = db.Document;
    Document.find({isActive:true})
    .then(documents => {
        if(!documents) res.sendStatus(404);
        else return res.status(200).json(documents);
    });
}

//Get Document By Id
function getById(req,res) {
    let Document = db.Document;
    Document.findById(req.params.id)
    .then(documents => {
        if(!documents) res.sendStatus(404);
        else return res.status(200).json(documents);
    })
    .catch(error => {
        return res.status(400).json(error);
    })
}

function getByName(req,res){
    let Document = db.Document;
    Document.find({name:req.params.name})
        .then(document => {
            if(!document) res.status(404).json(false);
            else return res.status(200).json(document);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

function getAllById(req,res){
    let Document = db.Document;
    Document.find({_id:req.params.id})
        .then(documents => {
            if(!documents) res.sendStatus(404);
            else return res.status(200).json(documents);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

// Update Document By Id
function updateById(req,res) {
    let Document = db.Document;
    Document.findByIdAndUpdate(req.params.id,req.body)
        .then(document => {
            if(!document) res.sendStatus(404);
            else return res.status(200).json(document);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}


router.get('', getAll)
router.get('/:id', getById)
router.get('/get/active', getAllActive)
router.get('/all/:id', getAllById)
router.get('/get/:name', getByName)
router.post('/register', register)
router.post('/update/:id', updateById)

module.exports = router