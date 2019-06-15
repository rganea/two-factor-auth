const express = require("express")
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require("../models/user")
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register',(req,res)=>{
    const today = new Date()
    const userData={
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        created: today
    }

    User.findOne({
        where:{
            email:req.body.email
        }
    })
    .then(user=>{
        if(!user){
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                userData.password=hash;
                bcrypt.hash(`${userData.email}${new Date().toString()}`,10,(err1,hash1)=>{
                    userData.secret = hash1;
                    User.create(userData)
                    .then(user=>{
                        res.json(user)
                    })
                    .catch(err=>{
                        res.send('error'+err)
                    })
                });
                
            })  
        }
        else{
            res.json({error: "User already exists"})
        }
    })
    .catch(err=>{
        res.send('error: '+ err)
    })
})

users.post('/login',(req,res)=>{
    User.findOne({
        where:{
            email: req.body.email
        }
    })
    .then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                let token = 
                    jwt.sign( user.dataValues, process.env.SECRET_KEY, {
                    expiresIn: 1440
                });
                console.log(user);
                res.status(200).json(user)
            }
        }else{
            res.status(404).json({error:'User does not exist'})
        }

    })
    .catch(err=>{
        res.status(400).json({err: error})
    })
})

module.exports=users;