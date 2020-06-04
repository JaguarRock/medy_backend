const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
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
    },
    users_sex:{
        type : String,
        required : true,
        trim : true
    },
    users_disease:{
        type : String,
        required : true
    },
    users_smoke:{
        type : String,
        required : true
    },
    users_drink:{
        type : String,
        required : true
    },
    users_smoke:{
        type : String,
        required : true
    },
    users_disease_array:{
        type : String,
        trim : true
    }
}, {
    timestamps : true,
});

const User = mongoose. model('User', userSchema);
module.exports = User;
//users_email, users_name, users_password, users_sex, users_disease, users_drink, users_smoke, users_disease_array