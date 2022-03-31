import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user.model.js';

passport.use(new LocalStrategy((username, password, done) => {
  User.verifyPassword(username, password).then(user => {
    if (!user) {
      return done(null, false, { message: 'Invalid username or password' });
    }
    return done(null, user);
  })
    .catch(error => done(error));
}));

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

export default passport;
