import { Router } from 'express';
import passport from '../middlewares/passport.js';
const router = Router();

router.get('/', (req, res) => {
  res.redirect('/auth/login');
});

router.get('/login', (req, res) => {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.render('login.ejs');
});

router.get('/error', (req, res) => {
  req.flash('error', 'Please login to continue');
  req.flash('error', 'Invalid username or password');
  res.redirect('/auth/login');
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logout successful');
  res.redirect('/auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

export default router;
