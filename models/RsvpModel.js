const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    guestType: {
        type: String,
        required: false
    },
    numberPax: {
        type: Number,
        required: false
    },
    timeslot: {
        type: String,
        required: false
    },
    projectId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// const RsvpModel = mongoose.model('RsvpModel', rsvpSchema)

module.exports = rsvpSchema