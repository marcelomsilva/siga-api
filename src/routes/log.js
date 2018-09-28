'use strict';
const express = require('express')
const router = express.Router()
const db = require('../db/index')


function register(req,res){
    let Log = db.Log;
    let date = new Date();
    let log = new Log({
        userId: req.body.userId,
        login: date,
        logout: null
    });
    log.validate()
        .then(() => log.save())
        .then(() => {
            return res.status(200).json(log);
        })
        .catch(error => {
            res.sendStatus(400).json(error);
        });
}

function getByUserId(req,res){
    let Log = db.Log;
    Log.find({userId:req.params.id})
        .then(logs => {
            if(!logs) res.sendStatus(404);
            else return res.status(200).json(logs);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

function updateById(req,res){
    let Log = db.Log;
    let date = new Date();
    Log.findOneAndUpdate({_id:req.body._id},{logout:date})
        .then(log => {
            if(!log) res.sendStatus(404);
            else return res.status(200).json(log);
        })
        .catch(error => {
            return res.status(200).json(error);
        });
}

router.get('/user/:id', getByUserId)
router.post('/register', register)
router.post('/update', updateById)

module.exports = router