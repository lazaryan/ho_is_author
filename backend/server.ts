import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import session from 'express-session'
import { v4 as uuidv4 } from 'uuid'
import MongoStore from 'connect-mongo';

import path from 'path'
import fs from 'fs'

import routesAction from './routes';
import { handleErrorInternal, handleErrorNotFound } from './controllers/errors';

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

import passport from './middlewares/passport'

const app = express()

app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    // using store session on MongoDB using express-session + connect
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/ho_is_author'
    })
}))
app.use(passport.initialize())
app.use(passport.session({
    //@ts-ignore
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/ho_is_author'
    })
}))

app.use('/static', express.static(path.resolve(process.cwd(), '..', 'build', 'static', 'pages')))
app.use('/general', express.static(path.resolve(process.cwd(), '..', 'build', 'static', 'statics')))
app.use('/static/app', express.static(path.resolve(process.cwd(), '..', 'build', 'app')))
app.use(morgan('combined', { stream: accessLogStream }))

routesAction(app, passport)

app.use(handleErrorNotFound);
app.use(handleErrorInternal);

export default app;
