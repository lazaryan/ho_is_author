module.exports = ({ req, res }) => {
    const isAuthenticated = req.isAuthenticated()

    const data = {
        status: isAuthenticated
    }

    isAuthenticated && (data.user = {
        email: req.user.email
    })

    res.send(data)
}
