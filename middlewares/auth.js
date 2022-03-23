import {encode} from 'querystring';

const loginErr = (req, res) => {
  req.flash('error', 'Please login to continue');
  req.flash('redirect', encode({url:req.url}));
  res.redirect('/auth/login');
};

const checkLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    loginErr(req, res);
  }
};

export {
  checkLogin
};
