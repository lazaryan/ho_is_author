const { handleApi } = require('./controllers/api')
const { handleStaticApp } = require('./controllers/static')
const { handleReact } = require('./controllers/react')

const routes = [
    {
        path: '/api/*',
        method: 'all',
        action: handleApi
    },
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
    {
        path: '/create',
        method: 'get',
        action: handleReact
    },
    {
        path: '/',
        method: 'get',
        action: handleReact
    }
]

module.exports = routes
