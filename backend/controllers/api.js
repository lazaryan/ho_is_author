const routes = require('./api/routes')

const { handleErrorNotFound } = require('./error')


module.exports.handleApi = (...args) => {
    const [action, method] = [args[0].url.match('/api/(.*)')[1], args[0].method]
    
    return (routes[action] && (routes[action].method === 'all' || routes[action].method === method.toLowerCase())
        ? routes[action].action
        : handleErrorNotFound
    )(...args)
}
