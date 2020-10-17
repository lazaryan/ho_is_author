module.exports = (passport, req, res) => {
    return passport.authenticate('register',{
        successRedirect : '/',
        failureRedirect : '/register'
    })
}
