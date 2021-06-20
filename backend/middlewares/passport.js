import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { v4 as uuidv4 } from 'uuid'

import User from '../models/user'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, (err, user) => {
    done(err, user);
  })
})

passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err)
    }

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' })
    }

    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password !' })
    }

    return done(null, user);
  })
}))

passport.use('register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err)
    }

    if (user) {
      return done(null, false, { message: 'Пользователь с такой почтой уже есть в системе' })
    } else {
      if (!password || passport.length < 8) {
        return done(null, false, { message: 'Слишком короткий пароль. Введите минимум 8 символов' })
      }
      
      const { role, name } = req.body;

      const newUser = new User()

      newUser.email = email
      newUser.password = newUser.generateHash(password)
      newUser.entity_id = uuidv4()
      newUser.role = role || 'user'
      newUser.name = name || ''

      newUser.save(err => {
        if(err) {
          return done(error)
        }
    
        return done(null, newUser)
      })
    }
  })
}))

export default passport;
