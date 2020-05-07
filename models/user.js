const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    users_id:{
        type : String,
        required :true,
        unique : true,
        trim : true,
        minlength : 3
    },
    users_email:{
        type : String,
        required : true,
        unique : true, 
        trim : true,
        minlength : 5
    },
    users_name:{
        type : String,
        required : true,
        unique : false,
        trim : true,
        minlength : 3
    },
    users_password:{
        type : String,
        required : true,
        unique : false,
        trim : true, 
        minlength : 5
    }
}, {
    timestamps : true,
});

const User = mongoose. model('User, userSchema');
module.exports = User;
//users_id, users_email, users_name, users_password