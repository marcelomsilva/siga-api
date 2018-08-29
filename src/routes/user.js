'user strict';
const express = require('express')
const router = express.Router()
const db = require('../db/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('./config')

function register(req,res) {
    let User = db.User;
    let user = new User({
        registration: req.body.registration,
        name: req.body.name,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password,10),
        isActive: req.body.isActive,
        isLeader: req.body.isLeader,
        isAdmin: req.body.isAdmin
    }).save((error,user)=>{
        if(error){
            return res.status(400).json({error:error});
        }else{
            let token = jwt.sign({id:user._id},config.secrect,{
                expiresIn: 86400
            });
            res.status(200).send({auth:true,token:token});
        }
    });
}

function getUser(req,res) {
    var token = req.headers['x-access-token'];
    let User = db.User;
    if(!token) {
        return res.status(401).send({auth:false,message:'No token provided'});
    } else {
        jwt.verify(token,config.secrect,(error,decoded)=>{
            User.findById(decoded.id,{password:false},(error,user)=>{
                if(error) {
                    return res.status(500).send(error);
                }else{
                  if(!user){
                      res.status(400).send(error);
                  }else{
                      res.status(200).send(user);
                  }
                }
            });
        });
    }
}


router.post('/register', register)
router.get('login', getUser)

module.exports = router