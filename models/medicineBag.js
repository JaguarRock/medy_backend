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
// 촐이 갓갓

module.exports = mongoose.model('Student', medicineBagSchema);
// chori god!!