const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let medicineBagSchema = new Schema({
    id : {
        type: Number
    },
    bagName : {
        type: String
    },
    bagConsist: {
        type: String
    }
}, {
    collection: 'medicineBag'
})

module.exports = mongoose.model('Student', medicineBagSchema);
// chori god!!