import passport from 'passport';
import LocalStrategy from 'passport-local';
import db from '../models/db.js';

passport.use(new LocalStrategy((username, password, done) => {
  if (db.username === username && db.password === password) {
    return done(null, db);
  }
  done(null, false, { message: 'Invalid username or password' });
}));

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

export default passport;
