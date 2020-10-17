const path = require('path')

const handleStaticApp = ({ req, res }) => {
    const app = req.url.match('\(\\w+).*')[1]

    res.sendFile(path.resolve(`../build/${app}/index.html`))
}

module.exports.handleStaticApp = handleStaticApp

module.exports = [
    {
        path: '/login',
        method: 'get',
        action: handleStaticApp
    },
    {
        path: '/register',
        method: 'get',
        action: handleStaticApp
    },
]
