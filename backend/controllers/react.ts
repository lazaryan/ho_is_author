import path from 'path'

import isLoggedIn from './middlewares/isLoggedIn';
import { Action, RouteAction } from 'routes';

const handleReact = ({ res }: Action) => {
  res.sendFile(path.resolve(`../build/app/index.html`))
}

const routes: RouteAction[] = [
  {
    path: '/create',
    middleware: isLoggedIn,
    method: 'get',
    action: handleReact
  },
  {
    path: '/admin',
    middleware: isLoggedIn,
    method: 'get',
    action: handleReact
  },
  {
    path: '/',
    method: 'get',
    action: handleReact
  },
];

export default routes;
