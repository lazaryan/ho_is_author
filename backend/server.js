const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const uuid = require('uuid')

const path = require('path')
const fs = require('fs')

const { handleErrorInternal, handleErrorNotFound } = require('./controllers/error')

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

require('./middlewares/passport')(passport)

const app = express()

app.use(cors())
app.use(cookieParser())
app.use('/static', express.static(path.resolve('../', 'build')))
app.use(bodyParser.json({ strict: false }))
app.use(morgan('combined', { stream: accessLogStream }))
app.use(flash())
app.use(session({
    secret: uuid.v4(),
    saveUninitialized: true,
    resave: true
}))
app.use(passport.initialize())
app.use(passport.session())

require('./routes')(app, passport)

app.use(handleErrorNotFound)
app.use(handleErrorInternal)

module.exports.app = app