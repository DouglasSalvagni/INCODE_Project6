const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({ 
    img:
    {
        filePath: String,
        contentType: String
    },
    name: String,
    desc: String,
    approved: false,
    totalComments: String,
    totalLikes: String
});
 
 
module.exports = new mongoose.model('Location', locationSchema);