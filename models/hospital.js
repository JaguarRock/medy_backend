const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let hospitalSchema = new Schema({
    id: {
        type: String 
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    doctor: {
        type: String
    },
    address: {
        type : String
    },
    phoneNum: {
        type : String
    },
    kinds: {
        type : String
    },
    email: {
        type: String
    }
}, {
    collection: 'hospital'
});

const hospital = mongoose.model('hospital', hospitalSchema);

module.exports = hospital;

