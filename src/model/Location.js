const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    img:{
         filePath: String,
         contentType: String
         },
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,  
        index:true
    },
    desc: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        index:true
    },
    approved:false,
    totalComments: { 
        type: String,
    },
    totalLikes: {
        type: String,
    }
   
});

locationSchema.index({ name : 1, desc : 1 })

module.exports = new mongoose.model('Location', locationSchema);