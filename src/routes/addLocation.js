const router = require('express').Router()
const imgVal = require('../utils/validation')
const Location = require('../model/Location')
var fs = require('fs')

var path = require('path')
var multer = require('multer');
var dir = path.join(__dirname, '../public/images/uploads/')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
});

router.get('/', (req, res) => {
  res.render('addLocationForm', { message: '', toast: false })
})

router.post('/', function (req, res)  {
    let upload = multer({ storage: storage, fileFilter: imgVal.imageFilter }).single('uploaded_file');

    upload(req, res, function(err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }  
    var obj = {
        userId: req.session.user._id,
        img: {
            filePath: '/images/uploads/' + req.file.filename,
            contentType: req.file.mimetype
        },
        name: req.body.locationName,
        desc: req.body.description,
        approved: false,
        totalComments : '4',
        totalLikes: '4'
    }

    Location.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.render('addLocationForm', {message:"successfully uploaded",toast:true})
   
        }
    })
})
})

module.exports = router
