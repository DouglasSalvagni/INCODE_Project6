const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { profileValidation } = require('../utils/validation');


router.get('/', function(req, res, next) {
    const loggedUser = req.session.user ? req.session.user : false
if(loggedUser){
    if (! req.session.user._id) {
      var err = new Error("You are not authorized to view this page.");
      err.status = 403;
      return console.log(err);
    }
    User.findById(req.session.user._id, (err,user)=>{
      if (err) {
        return  console.log(err)
      } else {
     return res.render('userProfile', {message:"" , toast:false , loggedUser: loggedUser, user: user});
      }
    })
    
}
else{
    console.log("User is not loggedin")
    res.redirect('/'); 
}
})


module.exports = router