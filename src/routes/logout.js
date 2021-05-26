const router = require('express').Router();

router.get("/", (req, res) => {

    //put here the logic of logout
    req.session.authorized = false;
    req.session.user = false;

    console.log(req.session.user)
    
    res.redirect('/');
});

module.exports = router;