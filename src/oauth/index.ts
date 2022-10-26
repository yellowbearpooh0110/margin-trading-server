import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { appUrl } from '../config';

const router = express.Router();

// #1
router.get(
  '/google',
  passport.authenticate(
    'google',
    {
      scope: ['profile', 'email'],
      // session: false,
    },
    (err, user) => {
      // tslint:disable-next-line:no-console
      console.log('user:', user);
    }
  )
);

// #2
router.get(
  '/google/callback',
  passport.authenticate('google', {
    // session: false,
    failureRedirect: '/oauth/google/callback_fail',
    successRedirect: '/oauth/google/callback_success',
  })
);

router.get('/google/callback_success', (req, res) => {
  const token = jwt.sign(req.user, process.env.JWT_SECRET, {
    expiresIn: '1 day',
  });
  res.redirect(`${appUrl}signin?token=${token}`);
});

router.get('/google/callback_fail', (req, res) => {
  res.json('the callback after google DID NOT authenticate the user');
});

export default router;
