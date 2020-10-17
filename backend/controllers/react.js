const path = require('path')
const isLoggedIn = require('./middlewares/isLoggedIn')

const handleReact = ({ res }) => {
    res.sendFile(path.resolve(`../build/main/index.html`))
}

module.exports.handleReact = handleReact

module.exports = [
    {
        path: '/create',
        method: 'get',
        middleware: isLoggedIn,
        action: handleReact
    },
    {
        path: '/admin',
        method: 'get',
        middleware: isLoggedIn,
        action: handleReact
    },
    {
        path: '/',
        method: 'get',
        action: handleReact
    }
]