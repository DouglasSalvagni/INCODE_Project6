const router = require('express').Router()
const Location = require('../model/Location');

router.get('/', (req, res) => {
    const loggedUser = req.session.user ? req.session.user : false
    Location.find({},(err, result) => {

        const imgArray= result.map(element => element);
        let filterArray = imgArray.filter(function(ele){ return ele.approved== true;
        });
     if (err) return console.log(err)
     res.render('home', {toast:false, loggedUser:loggedUser, locations:filterArray})
   
    })
})


module.exports = router
