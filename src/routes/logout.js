const router = require('express').Router();

router.get("/", (req, res) => {

    //put here the logic of logout
    
    res.redirect('/');
});

module.exports = router;