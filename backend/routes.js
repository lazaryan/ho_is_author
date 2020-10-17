const routesApi = require('./controllers/api')
const routesStatic = require('./controllers/static')
const routesReact = require('./controllers/react')

const routes = [
    ...routesApi,
    ...routesStatic,
    ...routesReact
]

module.exports = (app, passport) => {
    routes.forEach(({ path, method, middleware = [], action }) =>
        app[method](path, middleware, (req, res, next) => action({ passport, req, res, next }))
    )
}
