const login = require('./login')

const routes = {
    'login': {
        method: 'get',
        action: login
    }
}

module.exports = routes
