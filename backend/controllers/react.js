const path = require('path')

module.exports.handleReact = (passport, req, res) => {
    res.sendFile(path.resolve(`../build/main/index.html`))
}