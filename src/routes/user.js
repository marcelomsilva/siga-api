'user strict';
const express = require('express')
const router = express.Router()
const db = require('../db/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('./config')

// Create new User
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

// Get User By Registration
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

//Get User By Username
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

// Get User By Id
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

//Get User By Id
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

//Update User By Id
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

//Change User Password Logged
function changeMyPassword(req,res){
    let User = db.User;
    User.findOne({registration:req.body.registration}) //{password:bcrypt.hashSync(req.body.password,10)
        .then(user => {
            if(!user){
                res.sendStatus(404);
            }else{
                let isPasswordValid = bcrypt.compareSync(req.body.currentPassword,user.password);
                if(!isPasswordValid){
                    return res.json({status:false});
                }else{
                    User.findOneAndUpdate({registration:req.body.registration},{password:bcrypt.hashSync(req.body.password,10)})
                        .then(user =>{
                            return res.status(200).json({status:true});
                        });
                }
            }
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

//Change User Password
function changePassword(req,res){
    let User = db.User;
    User.findOneAndUpdate({registration:req.body.registration},{password:bcrypt.hashSync(req.body.password,10)})
        .then(user => {
            if(!user) res.sendStatus(404);
            else return res.status(200).json(user);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
}

// Get All Users
function getAll(req,res) {
    let User = db.User;
    User.find()
        .then(users =>{
            if(!users) res.sendStatus(404);
            else return res.status(200).json(users);
        });
}

router.get('', getAll)
router.get('/:id', getById)
router.get('/me/:token', getUser)
router.post('/register', register)
router.post('/update/:id', updateById)
router.get('/registration/:id', getByRegistration)
router.post('/change/password', changePassword)
router.post('/change/my/password', changeMyPassword)
router.get('/username/:username',getByUsername)


module.exports = router