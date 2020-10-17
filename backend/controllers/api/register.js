module.exports = ({ passport, req, res, next }) => {
    return passport.authenticate('register',{
        successRedirect : '/',
        failureRedirect : '/register'
    })(req, res, next)
}
