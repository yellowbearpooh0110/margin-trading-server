import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const AuthorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('jwt', (err, user) => {
    if (user) {
      req.user = user;
      next();
    } else res.status(401).send('Unauthorized');
  })(req, res);
};
