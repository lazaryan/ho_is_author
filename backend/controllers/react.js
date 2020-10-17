const path = require('path')

module.exports.reactApps = [
    'login',
    'register',
    'create',
    '',
]

module.exports.handleReact = (req, res) => {
    res.sendFile(path.resolve(`../build/main/index.html`))
}