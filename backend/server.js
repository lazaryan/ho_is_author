const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')

const path = require('path')
const fs = require('fs')

const routes = require('./routes')
const { handleErrorInternal, handleErrorNotFound } = require('./controllers/error')

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const app = express()

app.use(cors())
app.use(cookieParser())
app.use('/static', express.static(path.resolve('../', 'build')))
app.use(bodyParser.json({ strict: false }))
app.use(morgan('combined', { stream: accessLogStream }))

routes.forEach(({ path, method, middleware = [], action }) => {
    app[method](path, middleware, action)
})

app.use(handleErrorNotFound)
app.use(handleErrorInternal)

module.exports.app = app