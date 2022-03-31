import { encode } from 'querystring';

const Forbidden = {
  code: 403,
  desc: 'Forbidden',
  content: 'You are not authorized to access this resource'
};

const checkLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('error', 'Please login to continue');
    req.flash('redirect', encode({ url:req.url }));
    res.redirect('/auth/login');
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
