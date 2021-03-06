
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/user");  
const mangoose = require('mongoose');
const keys = require('./keys');

const opts ={}
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport =>{
    passport.use(
        new jwtStrategy(opts,(jwtPayload, done)=>{
        Users.findById(jwtPayload.id)
        .then(user =>{
            if(user){
                return done(null,user)
            }
            return done(null,false);
        })
        .catch(err =>{
            console.log(err)
        })
    })
    );
}