const path = require('path')

module.exports.handleReact = (req, res) => {
    res.sendFile(path.resolve(`../build/main/index.html`))
}