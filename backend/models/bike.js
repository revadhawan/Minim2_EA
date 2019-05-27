const mongoose = require('mongoose');
const { Schema } = mongoose;

const bikeSchema = new Schema({
    name: {type: String, required: true},
    kms: {type: String, required: true},
    state: {type: Boolean, default: false},
    description: {type: String},
    assigned: {type: Boolean, require: true}
})

module.exports = mongoose.model('bike', bikeSchema)