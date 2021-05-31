const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({ 
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
 
 
module.exports = new mongoose.model('Location', locationSchema);