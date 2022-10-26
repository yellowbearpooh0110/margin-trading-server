import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import bcryptjs from 'bcryptjs';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// import prisma from '../prisma';
import { User } from '@prisma/client';
import * as UserSerivce from './service/user.service';
import { appUrl } from './config';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      // this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      try {
        const _user = await UserSerivce.GetUserByEmail({ email });
        if (_user && bcryptjs.compareSync(password, _user.password)) {
          const { password: passwordFromDB, ...userWithoutPassword } = _user;
          if (bcryptjs.compareSync(password, passwordFromDB))
            return done(null, userWithoutPassword, {
              message: 'Logged In Successfully',
            });
        } else {
          return done(null, null, {
            message: 'Incorrect email or password.',
          });
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${appUrl}oauth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // tslint:disable-next-line:no-console
        console.log(profile);
        if (profile._json.email) {
          const _user = await UserSerivce.GetUserByEmail({
            email: profile._json.email,
          });

          if (_user) {
            const { password, ...userWithoutPassword } = _user;
            done(null, userWithoutPassword);
          } else {
            const _newUser = await UserSerivce.CreateUser({
              name: profile._json.name,
              email: profile._json.email,
              avatar: profile._json.picture,
              password: bcryptjs.hashSync('123456'),
            });
            const { password, ...userWithoutPassword } = _newUser;
            done(null, userWithoutPassword);
          }
        } else
          return done(null, null, {
            message: 'Google Profile Error.',
          });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const _user = await UserSerivce.GetUserById({ id: jwtPayload.id });
        if (_user) {
          const { password, ...userWithoutPassword } = _user;
          done(null, userWithoutPassword);
        } else {
          return done(null, null, {
            message: 'User does not exist.',
          });
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj as User);
});
