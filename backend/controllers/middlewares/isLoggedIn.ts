import { Request, Response, NextFunction } from 'express';

const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if(req.isAuthenticated()) {
      return next();
  }

  res.redirect('/login');
}

export default isLoggedIn;
