const router = require('express').Router()

router.get('/', (req, res) => {

    const loggedUser = req.session.user ? req.session.user : false

    res.render('home', {toast:false, loggedUser})
})

module.exports = router
