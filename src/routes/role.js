const express = require('express')
const router = express.Router()
const db = require('../db/index')


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

function getAll(req,res) {
    let Role = db.Role;
    Role.find()
        .then(roles => {
            if(!roles) res.sendStatus(404);
            else return res.status(200).json(roles);
        }
    );
}

router.post('/register', register)
router.get('', getAll)

module.exports = router