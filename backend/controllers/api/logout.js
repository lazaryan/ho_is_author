module.exports = (passport, req, res, next) => {
    req.logout()
    res.redirect('/')
}