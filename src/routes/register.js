const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { signupValidation } = require('../utils/validation');

router.get("/", (req, res) => {
    res.render('signup', {message:"", toast: false, firstName: "", surName:"", email:""})
});

router.post("/", async (req, res) => {

    const { firstName, surName, email, password } = req.body;

    //validating data before create user
    const { error } = await signupValidation(req.body);
    if( error ) return res.render('signup', {message:error.details[0].message, toast: true, firstName, surName, email, password});

    //Checking if user is already in the database
    const emailExist = await User.findOne({email: email});
    if( emailExist ) return res.render('signup', {message: "Email already exist", toast: true, firstName, surName, email, password});

    
    //Hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //Create a new user
    const user = new User({
        firstName: firstName,
        surName: surName,
        email: email,
        password: hashPassword,
    });


    try {
        await user.save();
        //Create session
        req.session.authorized = true;
        req.session.user = user;

        res.redirect('/');
    } catch(err){
        res.render('500', {message:"", toast: false})
    }


});


module.exports = router;