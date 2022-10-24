import express from 'express';

import * as Middleware from '../middleware';
import * as UserController from '../controller/user.controller';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

/* GET user profile. */
router.get(
  '/profile',
  Middleware.AuthorizationMiddleware,
  UserController.GetUserProfile
);

export default router;
