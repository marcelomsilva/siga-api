const express = require('express')
const router = express.Router()
const db = require('../db/index')


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

router.post('/register', register);

module.exports = router;