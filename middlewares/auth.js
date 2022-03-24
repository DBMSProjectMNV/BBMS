import { encode } from 'querystring';

const Forbidden = {
  code: 403,
  desc: 'Forbidden',
  content: 'You are not authorized to access this resource'
};

const loginErr = (req, res) => {
  req.flash('error', 'Please login to continue');
  req.flash('redirect', encode({ url:req.url }));
  res.redirect('/auth/login');
};

const checkLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    loginErr(req, res);
  }
};

const userOnly = (name, req, res, next) => {
  if (req.user && req.user.name === name) {
    next();
    return;
  }
  return next(Forbidden);
};

export {
  checkLogin,
  userOnly
};
