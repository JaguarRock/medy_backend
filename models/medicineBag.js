const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let medicineBagSchema = new Schema({

    bagName: {
        type: String
    },
    bagConsist: {
        type: String
    },

}, {
    collection: 'medicineBag'
});

const MedicineBag = mongoose.model('MedicineBag', medicineBagSchema);

module.exports = MedicineBag;