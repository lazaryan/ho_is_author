const login = require('./login')
const logout = require('./logout')
const register = require('./register')
const user = require('./user')

;[login, logout, register, user].forEach(fn =>
    module.exports[fn.name] = fn    
)

module.exports = [
    {
        path: '/api/user/login',
        method: 'post',
        action: login
    },
    {
        path: '/api/user/logout',
        method: 'get',
        action: logout
    },
    {
        path: '/api/user/register',
        method: 'post',
        action: register
    },
    {
        path: '/api/user',
        method: 'get',
        action: user
    },
]
