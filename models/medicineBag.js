const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let medicineBagSchema = new Schema({
    id: {
        type: String, requied : true 
    },
    bagName: {
        type: String,  requied : true 
    },
    bagConsist: {
        type: String,  requied : true 
    }
}, {
    collection: 'medicineBag'
});

const MedicineBag = mongoose.model('MedicineBag', medicineBagSchema);

module.exports = MedicineBag;

