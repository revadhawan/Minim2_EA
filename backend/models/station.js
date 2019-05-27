const mongoose = require('mongoose');
const { Schema } = mongoose;

const stationSchema = new Schema({
    name: {type: String, required: true},
    state: {type: String, enum: ['available', 'NA']},    
    description: {type: String},
    bike: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'bike', 
        unique: false
    }]
})

module.exports = mongoose.model('station', stationSchema)