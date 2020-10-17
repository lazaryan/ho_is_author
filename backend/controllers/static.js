const path = require('path')

module.exports.handleStaticApp = (req, res) => {
    const app = req.url.match('\(\\w+).*')[1]

    res.sendFile(path.resolve(`../build/${app}/index.html`))
}
