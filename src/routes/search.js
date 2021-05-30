const router = require('express').Router()
const Location = require('../model/Location')
const routine = require('../model/Routine')
router.get('/', (req, res) => {
  const loggedUser = req.session.user ? req.session.user : false
  if (req.query.search != '') {
    var searchQuery = req.query.search
    Location.find( { $text: { $search: searchQuery} },(err, result) => {
        const imgArray= result.map(element => element);
        let filterArray = imgArray.filter(function(ele){ return ele.approved== true;
        });
     if (err) return console.log(err)
     res.render('home', {toast:false, loggedUser:loggedUser, locations:filterArray})
   
    })
  }
})

module.exports = router
