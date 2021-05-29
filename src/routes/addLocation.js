const router = require('express').Router()

const Location = require('../model/Location')
const imgVal = require('../utils/validation')
var fs = require('fs')
var multer = require('multer')
var path = require('path')
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  }
})


router.get('/', (req, res) => {
  res.render('addLocationForm', { message: '', toast: false })
})


let upload = multer({
  dest: 'uploads',
  fileFilter: imgVal.imageFilter
})


router.post('/', upload.single('uploaded_file'), (req, res, next) => {
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        approved: false,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.files.filename)),
            contentType: req.files.uploaded_file.mimetype
        }
    }
    Location.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.render('addLocationForm', {message:"successfully uploaded",toast:true})
   
        }
    });

//   let upload = multer({
//       storage: storage,
//       fileFilter: imgVal.imageFilter
//     }).single('uploaded_file')
//  upload(req, res, async function(err) {
//   if (req.fileValidationError) {
//     return res.status(500).send({ message: req.fileValidationError })
//   } else if (!req.files) {
//     return res.status(500).send({ message: 'Please select an image to upload' })
//   } else if (err instanceof multer.MulterError) {
//     return res.status(500).send({ message: err })
//   } else if (err) {
//     return res.status(500).send({ message: err })
//   } else {
 
//     var img = await fs.readFileSync(req.files.uploaded_file.path)
//     var encode_image = img.toString('base64')
//     // Define a JSONobject for the image attributes for saving to database
//     var finalImg = new Location({
//       name: req.body.locationName,
//       desc: req.body.description,
//       approved: false,
//       img: {
//         data: new Buffer.from(encode_image, 'base64'),
//         contentType: req.files.uploaded_file.mimetype
//       }
//     })

//     try {
//         await finalImg.save();
//         res.redirect('/');
//     } catch(err){
//         res.render('500', {message:"", toast: false})
//     }
//   }
// })
});

module.exports = router
