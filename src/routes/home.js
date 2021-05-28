const router = require('express').Router()
const Location = require('../model/Location');

router.get('/', (req, res) => {
    const loggedUser = req.session.user ? req.session.user : false
    Location.find({},(err, result) => {

        const imgArray= result.map(element => element._id);
     if (err) return console.log(err)
     res.render('home', {toast:false, loggedUser:loggedUser, locations:imgArray})
   
    })

    // locationModel.find({}, (err, items) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send('An error occurred', err);
    //     }
    //     else {
    //         res.render('home', {toast:false, loggedUser, locations:items})
    //     }
    // });

    // let locList=[];
    // location ={
    //     name: 'abc',
    //     description: 'dfxghghhjhjh',
    //     totalComments: 6,
    //     totalLikes: 3
    // }
    // locList.push(location)
  

})

module.exports = router
