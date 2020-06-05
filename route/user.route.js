const router = require('express').Router();
const express = require('express');
const mongoose = require('mongoose');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('../config/passport');

const User = require('../models/user');
const validator = require('../validation/validators');

router.route('/').get((req, res) => {
    User.find()
        .then(user=>res.json(user))   
        .catch(err=> res.status(400).json('Error: ' + err));
});

//users_email, users_name, users_password, users_sex, users_disease, users_drink, users_smoke, users_disease_array
router.route('/register').post((req, res) =>{
    const {errors, isValid} = validator.registerValidator(req.body);
    if(!isValid) {
        res.status(400).json(errors);
    }
    else {
        User
        .findOne({users_email:req.body.users_email})
        .then((user)=>{
            if(user) {
                res.status(400).json({"email" : "Email already exists!"});
            }
            else {
                const users_email = req.body.users_email;
                const users_name = req.body.users_name;
                const users_password = req.body.users_password;
                const users_sex = req.body.users_sex;
                const users_disease = req.body.users_disease;
                const users_drink = req.body.users_drink;
                const users_smoke = req.body.users_smoke;
                const users_disease_array = req.body.users_disease_array;
                const newUser = new User({
                    users_email,
                    users_name,
                    users_password,
                    users_sex,
                    users_disease,
                    users_drink,
                    users_smoke,
                    users_disease_array
                });
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.users_password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.users_password = hash;  
                        newUser
                        .save()
                        .then(()=>res.json('User added'))
                        .catch(err=>console.log(err));
                    })
                })
            }
        })
         .catch(err=>console.log(err));
    }
});

router.route('/login').post((req,res)=>{
    const {errors, isValid} = validator.loginValidator(req.body);
    if(!isValid){
        res.status(404).json(errors);
    }
    else{
        User
        .findOne({users_email:req.body.users_email})
        .then((user) =>{
            if(!user) res.status(404).json({"users_email" : "Email does not exist"});
            else{
                bcrypt
                .compare(req.body.users_password,user.users_password)
                .then((isMatch) => {
                    if(!isMatch) res.status(400).json({"users_password" : "Password does not exist"});
                    else{
                        const payload = {
                            email : user.users_email,
                            name : user.users_name     
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                                expiresIn:10
                            },
                            (err,token) =>{
                                res.json({
                                    success:true,
                                    token:"Bearer token: " + token                                
                                })
                            }
                        )
                    }   
                }) 
            }
        })
    }
})

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
    //User.findOne({users_email:req.body.users_email})
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) =>{
    User.findById(req.params.id)
        .then(user => {
            user.users_id = req.body.users_id;
            user.users_email = req.body.users_email;
            user.users_name = req.body.users_name;
            user.users_password = req.body.users_password;
            user.users_sex = req.body.users_sex;
            user.users_disease = req.body.users_disease;
            user.users_drink = req.body.users_drink;
            user.users_smoke = req.body.users_smoke;
            user.users_disease_array = req.body.users_disease_array;
            user.save()
                .then(() => res.json('User updated.'))
                .catch(err => res.status(400).json('Error: '+ err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

//users_email, users_name, users_password, users_sex, users_disease, users_drink, users_smoke, users_disease_array