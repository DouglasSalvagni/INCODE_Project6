const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: String,
    desc: String,
    approved: false,
    img:
    {
        data: String,
        contentType: String
    }
});
 
 
module.exports = new mongoose.model('Location', locationSchema);