const path = require('path')

module.exports.handleErrorNotFound = (req, res) => {
    res.status(404).sendFile(path.resolve(`../build/404/index.html`))
}

module.exports.handleErrorInternal = (req, res) => {
    res.status(500).sendFile(path.resolve(`../build/500/index.html`))
}
