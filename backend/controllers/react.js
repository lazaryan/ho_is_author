const path = require('path')

module.exports.handleReact = (passport, req, res) => {
    console.log(req.user.entity_id)
    res.sendFile(path.resolve(`../build/main/index.html`))
}