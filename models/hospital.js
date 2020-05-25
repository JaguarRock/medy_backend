const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let hospitalSchema = new Schema({
    hospital_id: {
        type: String, requied : true 
    },
    hospital_password: {
        type: String,  requied : true 
    },
    hospital_name: {
        type: String,  requied : true 
    },
    hospital_doctor_name: {
        type: String, required : true
    },
    hospital_address: {
        type : String, required : true
    },
    hospital_phone_num: {
        type : String, required : true
    },
    hospital_kinds: {
        type : String, required : true
    },
    hospital_operating_time: {
        type : String, required : true
    },
    hospital_user_email: {
        type: String, required : true
    }
}, {
    collection: 'hospital'
});

const hospital = mongoose.model('hospital', hospitalSchema);

module.exports = hospital;

