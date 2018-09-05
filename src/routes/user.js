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

function getByRegistration(req,res) {
    let User = db.User;
    User.find({registration:req.params.id})
        .then(user => {
            if(!user) res.sendStatus(404);
            else return res.status(200).json(user);
        })
        .catch(error => {
            res.status(400).json(error);
        });
}

function getByUsername(req,res) {
    let User = db.User;
    User.find({username:req.params.username})
        .then(user => {
            if(!user) res.sendStatus(404);
            else return res.status(200).json(user);
        })
        .catch(error => {
            res.status(400).json(error);
        });
}

function getById(req,res) {
    let User = db.User;
    User.findById(req.params.id)
        .then(user => {
            if(!user) res.sendStatus(404);
            else return res.status(200).json(user);
        })
        .catch(error => {
            res.status(400).json(error);
        });
}

function getUser(req,res) {
    var token = req.params.token; //req.headers['x-access-token'];
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

function updateById(req,res){
    let User = db.User;
    User.findByIdAndUpdate(req.params.id,req.body)
        .then(user => {
            if(!user) res.sendStatus(404);
            else return res.status(200).json(user);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

function updatePasswordById(req,res){
    let User = db.User;
    User.findByIdAndUpdate(req.params.id,{password:bcrypt.hashSync(req.body.password,10)})
        .then(user => {
            if(!user) res.sendStatus(404);
            else return res.status(200).json(user);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

function changePassword(req,res){
    let User = db.User;
    User.findOne({registration:req.body.registration})
        .then(user =>{
            if(!user){
                res.sendStatus(404);
            }else{
                let isPasswordValid = bcrypt.compareSync(req.body.currentPassword,user.password);
                if(!isPasswordValid){
                    console.log(req.body.password);
                    return res.json(false);
                }else{
                    console.log(req.body.password);
                    console.log(user.password);
                    return true;
                }
            }
        })
        .catch(error =>{
            return res.status(400).json(error);
        });
        
}

function getAll(req,res) {
    let User = db.User;
    User.find()
        .then(users =>{
            if(!users) res.sendStatus(404);
            else return res.status(200).json(users);
        });
}

router.get('', getAll)
router.get('/me/:token', getUser)
router.get('/:id', getById)
router.post('/register', register)
router.post('/update/:id', updateById)
router.get('/username/:username',getByUsername)
router.get('/registration/:id', getByRegistration)
router.post('/update/password/:id', updatePasswordById)
router.post('/change/password', changePassword)

module.exports = router