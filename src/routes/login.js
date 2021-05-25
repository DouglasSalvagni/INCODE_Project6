const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { loginValidation } = require('../utils/validation');

router.get("/", (req, res) => {
    res.render('login',{message:"", toast: false, email: ""});
});

router.get("/:userid", (req, res) => {
    res.render('login',{message:"", toast: false, email: ""});
});

router.post("/", async (req, res) => {
    
    const { email, password } = req.body;

    //validating data before login
    const { error } = loginValidation(req.body);
    if( error ) return res.render('login', {message:error.details[0].message, toast: true, email});

    //Checking if email exist in the database
    const user = await User.findOne({email: email});
    if(!user) return res.render('login', {message: "Email not found", toast: true, email});

    //Password is correct
    const validPass = await bcrypt.compare(password, user.password);
    if(!validPass) return res.render('login', {message: "Incorrect password", toast: true, email});

    //Create session
    req.session.authorized = true;
    req.session.user = user;
    res.redirect('/');
    
});


module.exports = router;