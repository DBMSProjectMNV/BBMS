import { checkLogin } from '../middlewares/auth.js';
import User from '../models/user.model.js';
import Retailer from '../models/retailer.model.js';

const forgotControllerPOST = async (req, res) => {
  const { rid } = req.body;
  const { answer } = req.body;
  const { password } = req.body;
  const yes = await User.verifyAnswer(rid, answer);
  if (!yes) {
    res.end('Invalid answer');
  } else {
    await User.changePassword(password, rid);
    res.end('Password change successful');
  }
};

const forgotControllerGET = async (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard');
    return;
  }
  if (!req.query.username) {
    req.flash('error', 'Invalid username');
    res.redirect('/auth/login#forgot');
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
      res.locals.error = req.flash('error');
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
  const yes = await User.verifyById(old, rid);
  if (!yes) {
    req.flash('Old password incorrect');
    res.redirect('/auth/change');
    return;
  }
  await User.changePassword(password, rid);
  req.flash('success', 'Password changed successfully');
  res.redirect('/profile/edit');
};

const registerController = async (req, res) => {
  const ret = {
    'Retailer_name': req.body.name,
    'Retailer_contact': req.body.contact,
    'Retailer_email': req.body.email,
    'Retailer_address': req.body.address
  };
  const rid = await Retailer.add(ret);
  const user = {
    'password': req.body.password,
    'Hint_question': req.body.hintq,
    'Answer': req.body.answer,
    'Retailer_id': rid
  };
  await User.add(user);
  req.flash('success', 'Registered successfully. Please login to continue');
  res.redirect('/auth/login');
};

const hintControllerPOST = async (req, res) => {
  const obj = {
    'Hint_question': req.body.hintq,
    'Answer': req.body.answer
  };
  await User.saveHintq(req.user.rid, obj);
  req.flash('success', 'Hint question changed successfully');
  res.redirect('/profile/edit');
};

const deleteControllerPOST = async (req, res) => {
  const result = await User.verifyById(req.body.old, req.user.rid);
  if (result) {
    await Retailer.del(req.user.rid);
    req.flash('success', 'Account deleted successfully');
    res.redirect('/auth/logout');
  } else {
    req.flash('error', 'Invalid password');
    res.redirect('/auth/delete');
  }
};

export {
  forgotControllerGET,
  forgotControllerPOST,
  changePasswordGET,
  changePasswordPOST,
  registerController,
  hintControllerPOST,
  deleteControllerPOST
};
