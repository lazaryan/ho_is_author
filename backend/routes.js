const { handleReact, reactApps } = require('./controllers/react')

const routes = [
    ...reactApps.map(app => ({
        path: `/${app}`,
        method: 'get',
        action: handleReact
    }))
]

module.exports = routes
