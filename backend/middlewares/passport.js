const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const uuid = require('uuid')

const User = require('../models/user')

module.exports = function(passport){
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })

    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        User.findOne({ email }, (err, user) => {
            if (err) {
                return done(err)
            }

            if (user) {
                return done(null, false, req.flash('registerMessage','Email is already taken...' ))
            } else {
                const newUser = new User()

                const { name } = req.body

                newUser.email = email
                newUser.password = newUser.generateHash(password)
                newUser.entity_id = uuid.v4()

                name && (newUser.name = name)

                newUser.save(err => {
                    if(err) {
                        throw err
                    }
                
                    return done(null, newUser)
                })
            }
        })
    }))

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback:true
    },
    (req, email, password, done) => {
        User.findOne({ email }, (err, user) => {
            if (err) {
                return done(err)
            }

            if (!user) {
                return done(null, false, req.flash('loginMessage','Incorrect username.' ))
            }

            if (!user.validPassword(password)) {
                return done(null, false,  req.flash('loginMessage','Incorrect password !' ))
            }

            return done(null, user);
        })
    }))
}