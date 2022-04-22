import { Router } from 'express';
import passport from '../middlewares/passport.js';
import { checkLogin } from '../middlewares/auth.js';
import loginValidator from '../middlewares/validators/login.js';
import registerValidator from '../middlewares/validators/register.js';
import {
  forgotControllerPOST,
  forgotControllerGET,
  changePasswordGET,
  changePasswordPOST,
  registerController
} from '../controllers/auth.js';
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
  res.render('login.ejs');
});

router.get('/auth/register', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
    return;
  }
  res.locals.error = req.flash('error');
  const params = [
    'name',
    'password',
    'hintq',
    'answer',
    'contact',
    'email',
    'address'
  ];
  for (const param of params) {
    [res.locals[param]] = req.flash(param);
  }
  res.render('register.ejs');
});
router.post('/auth/register', registerValidator, registerController);

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

router.get('/auth/hint', checkLogin, (req, res) => {
  res.render('changeHintq.ejs');
});
router.get('/auth/delete', checkLogin, (req, res) => {
  res.render('delete.ejs');
});

export default router;
