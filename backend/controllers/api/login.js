module.exports = (passport, req, res) => {
    return passport.authenticate('login',{
        successRedirect : '/',
        failureRedirect : '/login'
    })
}
