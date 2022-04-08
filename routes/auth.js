import { Router } from 'express';
import passport from '../middlewares/passport.js';
import loginValidator from '../middlewares/validators/login.js';
import registerValidator from '../middlewares/validators/register.js';
import {
  forgotControllerPOST,
  forgotControllerGET,
  changePasswordGET,
  changePasswordPOST
} from '../controllers/auth.js';
// import User from '../models/user.model.js';
const router = Router();

router.get('/auth/', (req, res) => {
  res.redirect('/auth/login');
});

router.get('/auth/login', (req, res) => {
  if (req.isAuthenticated()) {
    const [url] = req.flash('redirect');
    res.redirect(url ?? '/dashboard');
    return;
  }
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  [res.locals.username] = req.flash('username');
  [res.locals.password] = req.flash('password');
  [res.locals.redirect] = req.flash('redirect');
  res.render('login');
});

router.get('/auth/register', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
    return;
  }
  res.locals.error = req.flash('error');
  res.render('register');
});

router.get('/auth/forgot', forgotControllerGET);
router.post('/auth/forgot', forgotControllerPOST);

router.get('/auth/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logout successful');
  res.redirect('/auth/login');
});

router.get('/auth/change', changePasswordGET);
router.post('/auth/change', changePasswordPOST);

router.post(
  '/auth/login',
  loginValidator,
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

router.post('/auth/register', registerValidator, (req, res) => {
  res.end('Congratulations! you are registered successfully');
});

export default router;
