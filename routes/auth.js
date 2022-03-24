import { Router } from 'express';
import passport from '../middlewares/passport.js';
import validator from '../middlewares/validator.js';
const router = Router();

router.get('/auth/', (req, res) => {
  res.redirect('/auth/login');
});

router.get('/auth/login', (req, res) => {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  [res.locals.username] = req.flash('username');
  [res.locals.password] = req.flash('password');
  [res.locals.redirect] = req.flash('redirect');
  res.render('login.ejs');
});

router.get('/auth/error', (req, res) => {
  req.flash('error', 'Please login to continue');
  req.flash('error', 'Invalid username or password');
  res.redirect('/auth/login');
});

router.get('/auth/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logout successful');
  res.redirect('/auth/login');
});

router.post(
  '/auth/login',
  validator,
  passport.authenticate('local', {
    /* successRedirect: '/dashboard', */
    failureRedirect: '/auth/login',
    failureFlash: true
  }),
  (req, res) => {
    const url = req.query.url ?? '/dashboard';
    res.redirect(url);
  }
);

export default router;
