const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    projectId: {
        type: String,
        required: true,
    }    
});

module.exports = wishSchema
