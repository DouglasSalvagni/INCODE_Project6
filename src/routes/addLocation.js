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
 
var upload = multer({ storage: storage, fileFilter: imgVal.imageFilter });

router.get('/', (req, res) => {
  res.render('addLocationForm', { message: '', toast: false })
})


router.post('/', upload.single('uploaded_file'),function (req, res)  {
   
    var obj = {
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
            // item.save();
            res.render('addLocationForm', {message:"successfully uploaded",toast:true})
   
        }
    })
})

// //   let upload = multer({
// //       storage: storage,
// //       fileFilter: imgVal.imageFilter
// //     }).single('uploaded_file')
// //  upload(req, res, async function(err) {
// //   if (req.fileValidationError) {
// //     return res.status(500).send({ message: req.fileValidationError })
// //   } else if (!req.files) {
// //     return res.status(500).send({ message: 'Please select an image to upload' })
// //   } else if (err instanceof multer.MulterError) {
// //     return res.status(500).send({ message: err })
// //   } else if (err) {
// //     return res.status(500).send({ message: err })
// //   } else {
 
// //     var img = await fs.readFileSync(req.files.uploaded_file.path)
// //     var encode_image = img.toString('base64')
// //     // Define a JSONobject for the image attributes for saving to database
// //     var finalImg = new Location({
// //       name: req.body.locationName,
// //       desc: req.body.description,
// //       approved: false,
// //       img: {
// //         data: new Buffer.from(encode_image, 'base64'),
// //         contentType: req.files.uploaded_file.mimetype
// //       }
// //     })

// //     try {
// //         await finalImg.save();
// //         res.redirect('/');
// //     } catch(err){
// //         res.render('500', {message:"", toast: false})
// //     }
// //   }
// // })
  
// });

module.exports = router
