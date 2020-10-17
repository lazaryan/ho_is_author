const { login, register } = require('./controllers/api')
const { handleStaticApp } = require('./controllers/static')
const { handleReact } = require('./controllers/react')


const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

const routes = [
    {
        path: '/api/login',
        method: 'post',
        action: login
    },
    {
        path: '/api/register',
        method: 'post',
        action: register
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
        middleware: isLoggedIn,
        action: handleReact
    },
    {
        path: '/',
        method: 'get',
        middleware: isLoggedIn,
        action: handleReact
    }
]

module.exports = (app, passport) => {
    routes.forEach(({ path, method, middleware = undefined, action }) =>
    middleware
        ? app[method](path, middleware, (...args) => action(passport, ...args))
        : app[method](path, (...args) => action(passport, ...args))
    )
}
