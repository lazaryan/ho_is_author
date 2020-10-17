module.exports = ({ passport, req, res, next }) => {
    return passport.authenticate('login',{
        successRedirect : '/',
        failureRedirect : '/login'
    })(req, res, next)
}
