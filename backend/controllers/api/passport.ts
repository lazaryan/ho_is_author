import { Action } from 'routes';

export const login = ({ req, res, next, passport }: Action) => {
  return passport.authenticate('login', (err, user, info) => {
    if (err || !user || info) {
      res.send({
        meta: {
          status: 'ERROR',
          message: err || info.message || 'Ошибка входа'
        }
      })
    } else {
      //@ts-ignore
      req.session.user = user
      res.send({
        meta: {
          status: 'OK'
        },
        redirect: '/'
      })
    }
  })(req, res, next)
}

export const register = ({ req, res, next, passport }: Action) => {
  return passport.authenticate('register', (err, user, info) => {
    if (err || info) {
      res.send({
        meta: {
          status: 'ERROR',
          message: err || info.message || 'Ошибка регистрации'
        }
      })
    } else {
      //@ts-ignore
      req.session.user = user
      res.send({
        meta: {
          status: 'OK'
        },
        redirect: '/'
      })
    }
  })(req, res, next)
}

export const logout = ({ req, res, next, passport }: Action) => {
  //@ts-ignore
  if (req.session.user) {
    //@ts-ignore
    delete req.session.user
  }
  
  req.logout()
  res.redirect('/')
}
