const mongoose = require('mongoose');

const userSchemma = new mongoose.Schema({
    admin: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    surName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', userSchemma)