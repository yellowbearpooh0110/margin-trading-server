import express from 'express';
import passport from 'passport';

import user from './user';
import auth from './auth';

const router = express.Router();

router.use('/user', user);
router.use('/auth', auth);

export default router;
