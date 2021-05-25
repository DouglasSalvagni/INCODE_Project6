module.exports = function (req, res, next){
    const authenticated = req.session.authorized;
    if(authenticated) {
        next()
    } else {
        res.redirect('/login')
    }

};