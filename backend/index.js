const { app } = require('./server')
const config = require('../configs/server')

if (!config) {
    throw new Error('Config file configs/server.js not found!');
}

try {
    app.listen(config.port, () => {
        console.log(`Application run on port ${config.port}`)
    })
} catch(err) {
    process.exitCode = 1
    console.error(err)
}
