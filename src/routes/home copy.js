const router = require('express').Router()

router.get('/', (req, res) => {

    const loggedUser = req.session.user ? req.session.user : false
    let locList=[];
    location ={
        name: 'abc',
        description: 'dfxghghhjhjh',
        totalComments: 6,
        totalLikes: 3
    }
    locList.push(location)
    res.render('home', {toast:false, loggedUser, locations:locList})

})

module.exports = router
