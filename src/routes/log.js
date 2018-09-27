'use strict';
const express = require('express')
const router = express.Router()
const db = require('../db/index')


function register(req,res){
    let Log = db.Log;
    let log = new Log(req.body);
    log.validate()
        .then(() => log.save())
        .then(() => {
            return res.status(200).json({id:log._id});
        })
        .catch(error => {
            res.sendStatus(400).json(error);
        });
}

router.post('/register', register)

module.exports = router