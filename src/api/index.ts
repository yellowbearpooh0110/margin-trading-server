import express from 'express';
import passport from 'passport';

import user from './user';
import auth from './auth';
import asset from './asset';

const router = express.Router();

router.use('/user', user);
router.use('/auth', auth);
router.use('/asset', asset);

export default router;
