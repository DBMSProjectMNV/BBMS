import { Router } from 'express';
import passport from '../middlewares/passport.js';
import { checkLogin } from '../middlewares/auth.js';
import loginValidator from '../middlewares/validators/login.js';
import registerValidator from '../middlewares/validators/register.js';
import {
  hintq,
  answer,
  passwordGen,
  resultGen
} from '../middlewares/validators/util.js';
import {
  forgotControllerPOST,
  forgotControllerGET,
  changePasswordGET,
  changePasswordPOST,
  registerController,
  hintControllerPOST,
  deleteControllerPOST
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
router.post(
  '/auth/forgot',
  [answer, passwordGen('password'), resultGen(['answer', 'password'])],
  forgotControllerPOST
);

router.get('/auth/logout', (req, res) => {
  const successes = req.flash('success');
  const errors = req.flash('errors');
  req.logout();
  req.flash('success', 'Logout successful');
  for (const msg of successes) {
    req.flash('success', msg);
  }
  for (const msg of errors) {
    req.flash('error', msg);
  }
  res.redirect('/auth/login');
});

router.get('/auth/change', changePasswordGET);
router.post(
  '/auth/change',
  [passwordGen('old'), passwordGen('password'), resultGen(['old', 'password'])],
  changePasswordPOST
);

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
  res.locals.error = req.flash('error');
  [res.locals.hintq] = req.flash('hintq');
  [res.locals.answer] = req.flash('answer');
  res.render('changeHintq.ejs');
});
router.post(
  '/auth/hint',
  checkLogin,
  [hintq, answer, resultGen(['hintq', 'answer'])],
  hintControllerPOST
);

router.get('/auth/delete', checkLogin, (req, res) => {
  res.locals.error = req.flash('error');
  [res.locals.old] = req.flash('old');
  res.render('delete.ejs');
});
router.post(
  '/auth/delete',
  checkLogin,
  [passwordGen('old'), resultGen(['old'])],
  deleteControllerPOST
);

export default router;
