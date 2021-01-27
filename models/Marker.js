const mongoose = require('mongoose');

const MarkerSchema = new mongoose.Schema({
    dogname: {
        type: String,
    },
    description: {
        type: String,
    },
    lat: {
        type: Number,
    },
    long: {
        type: Number,
    },
    user: {
        type: String,
    }
})

module.exports = mongoose.models.Marker || mongoose.model('Marker', MarkerSchema);