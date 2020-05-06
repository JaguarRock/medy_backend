const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let medicineBagSchema = new Schema({
    id: {
        type: Number, required: true
    },
    bagName: {
        type: String, required: true
    },
    bagConsist: {
        type: String, required: true
    }
}, {
    collection: 'medicineBag'
});

const MedicineBag = mongoose.model('MedicineBag', medicineBagSchema);

module.exports = MedicineBag;

