import path from 'path'

import { Action, RouteAction } from 'routes';

const pages = ['login', 'register', '404', '500']

const handleStaticApp = ({ req, res, next, passport }: Action) => {
  const { page } = req.params;

  if (pages.includes(page)) {
    res.sendFile(path.resolve(`../build/static/pages/${page}/index.html`))
  } else {
    next();
  }
}

const routes: RouteAction[] = [
  {
    path: '/:page',
    method: 'get',
    action: handleStaticApp
  }
]

export default routes;
