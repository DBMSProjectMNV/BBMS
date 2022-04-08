import User from '../models/user.model.js';
import { checkLogin } from '../middlewares/auth.js';

const forgotControllerPOST = async (req, res) => {
  const { rid } = req.body;
  const { ans } = req.body;
  const { password } = req.body;
  try {
    const yes = await User.verifyAnswer(rid, ans);
    if (!yes) {
      res.end('Invalid answer');
    } else {
      await User.changePassword(password, rid);
      res.end('Password change successful');
    }
  } catch (error) {
    console.log(error);
    res.end('some error');
  }
};

const forgotControllerGET = async (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
    return;
  }
  if (!req.query.username) {
    req.flash('error', 'Invalid username');
    res.redirect('/auth/login');
    return;
  }
  try {
    const arr = await User.findHintQ(req.query.username);
    [res.locals.hintq, res.locals.rid] = arr;
  } catch (error) {
    res.locals.error = JSON.stringify(error);
  }
  res.render('forgot');
};

const changePasswordGET = [
  checkLogin,
  (req, res) => {
    if (req.user && req.user.rid) {
      res.locals.rid = req.user.rid;
      res.render('changePass.ejs');
    } else {
      req.flash('error', 'Please login to continue');
      req.flash('redirect', req.url);
      res.redirect('/auth/login');
    }
  }
];

const changePasswordPOST = async (req, res, next) => {
  const { old } = req.body;
  const { password } = req.body;
  const { rid } = req.body;
  if (rid !== req.user.rid) {
    return next({ code: 400, desc: 'Bad request', content: 'rid malformed' });
  }
  try {
    const yes = await User.verifyById(old, rid);
    if (!yes) {
      res.end('Old password incorrect');
      return;
    }
    await User.changePassword(password, rid);
    res.end('Password changed successfully');
  } catch (error) {
    console.log(error);
    res.end('some error occurred');
  }
};

export {
  forgotControllerGET,
  forgotControllerPOST,
  changePasswordGET,
  changePasswordPOST
};
