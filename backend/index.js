mongoose = require('mongoose')

const { app } = require('./server')
const server = require('../configs/server')
const database = require('../configs/database')

if (!server) {
    throw new Error('Config file configs/server.js not found!');
}

if (!database) {
    throw new Error('Config file configs/database.js not found!');
}

mongoose.set('useCreateIndex', true)
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

try {
    app.listen(server.port, () => {
        console.log(`Application run on port ${server.port}`)
    })
} catch(err) {
    process.exitCode = 1
    console.error(err)
}
