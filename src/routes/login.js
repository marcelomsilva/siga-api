'use strict';
const express = require('express')
const router = express.Router()
const db = require('../db/index')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const config = require('./config')

// Login by Username and Password
function login(req,res) {
    let User = db.User;
    User.findOne({username:req.body.username},(error,user)=>{
        if(error){
            res.status(500).send(error);
        }else{
            if(!user){
                res.status(404).send(error);
            }else{
                let passwordIsValid = bcryptjs.compareSync(req.body.password,user.password);
                if(!passwordIsValid){
                    res.status(401).send({auth:false,token:null});
                }else{
                    let token = jwt.sign({id:user._id},config.secrect,{
                    expiresIn: 86400 
                    });
                    res.status(200).send({auth:true,token:token,user:user});
                }
            }
        }
    });
}

function logout(req,res){
    return res.status(200).json({auth:false,token:null});
}

router.post('', login)
router.get('/logout', logout)

module.exports = router