const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    img: {
        filePath: String,
        contentType: String
    },
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    comments: [
        { 
            authorId: String,
            author: String, 
            comment: String 
        }
    ],
    interactions: [
        { 
            authorId: String,
            //Interaction pattern: "1" is like, "0" is unlike
            interaction: String 
        }
    ],
    approved: {
        type: Boolean,
        default: false
    },
});

locationSchema.index({ name : 1, desc : 1 })

module.exports = new mongoose.model('Location', locationSchema);