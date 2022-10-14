import passport from 'passport';
import passportJWT, { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import bcryptjs from 'bcryptjs';

import prisma from '../prisma';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, cb) => {
      // this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return prisma.user
        .findFirst({ where: { email } })
        .then((user) => {
          if (!user || !bcryptjs.compareSync(password, user.password))
            return cb(null, false, { message: 'Incorrect email or password.' });
          const { password: passwordFromDB, ...userWithoutPassword } = user;
          return cb(null, userWithoutPassword, {
            message: 'Logged In Successfully',
          });
        })
        .catch((err) => cb(err));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, cb) => {
      // find the user in db if needed
      return prisma.user
        .findUnique({ where: { id: jwtPayload.id }, include: { asset: true } })
        .then((user) => {
          const { password, ...userWithoutPassword } = user;
          return cb(null, userWithoutPassword);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
