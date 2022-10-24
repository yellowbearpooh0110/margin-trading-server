import express from 'express';

import * as UserController from '../controller/user.controller';
import * as Middleware from '../middleware';

const router = express.Router();
/* POST login. */
// router.post('/login', UserController.AuthenticateUser);

/* POST register. */
// router.post('/register', UserController.CreateUser);

export default router;
