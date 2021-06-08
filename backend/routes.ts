import { PassportStatic } from 'passport'
import { Express, Request, Response, NextFunction } from 'express';
import staticRoutes from './controllers/static';
import reactRoutes from './controllers/react';
import apiRoutes from './controllers/api';

type RouteActions = (app: Express, passport: PassportStatic) => void;

export interface Action {
  passport: PassportStatic;
  req: Request | Request & { session: { user: any } };
  res: Response;
  next: NextFunction;
}

export interface RouteAction {
  path: string | RegExp;
  method: 'all' | 'get' | 'post' | 'put' | 'delete';
  middleware?: any;
  action: (params: Action) => void;
}

//@ts-ignore
const routes: RouteAction[] = [
  //@ts-ignore
  ...apiRoutes,
  ...staticRoutes,
  ...reactRoutes,
]

const routerAction: RouteActions = (app, passport) => {
  routes.forEach(({ path, method, middleware = [], action }) => {
    app[method](path, middleware, (req, res, next) => action({ passport, req, res, next }))
  })
}

export default routerAction;
