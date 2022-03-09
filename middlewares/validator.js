import { body, validationResult } from 'express-validator';

const passwdError =
'password may only contain alphanumeric, - _ & % $ # @ ! * and space';
const uname = body('username', 'invalid username')
  .trim()
  .isLength({ min: 1, max: 25 })  // username : 1 to 25
  .withMessage('username must be atmost 25 characters long and non empty')
  .matches(/^[a-zA-Z][a-zA-Z_\-0-9]*$/)  // :alnum: '-' '_' allowed
  .withMessage('username can only contain alphanumeric, hyphen, underscore')
  .customSanitizer(value => value.replaceAll(/_/g, '-'))  // '_' -> '-'
  .matches(/-?[a-zA-Z0-9]+$/) // hyphen cannot be last letter
  .withMessage('username should not have last letter hyphen')
  .customSanitizer(value => value.replaceAll(/-+/g, '-')) // single
  .customSanitizer(value => value.toLowerCase()); // all lower case

const passwd = body('password', 'invalid password')
  .trim()
  .isLength({ min: 8 }) // password : 8 to 32
  .withMessage('Password should be atleast 8 characters long')
  .isLength({ max: 32 })
  .withMessage('Password should be at most 32 characters long')
  .matches(/^[a-zA-Z0-9*!@#$%& \-_]*$/)
  .withMessage(passwdError);
  // :aA0-_: '!' '*' '@' '#' '$' '%' '&' ' '

const result = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const [uname] = errors.errors.filter(obj => obj.param === 'username');
    const [passwd] = errors.errors.filter(obj => obj.param === 'password');
    if (uname) {
      req.flash('error', uname.msg);
    }
    if (passwd) {
      req.flash('error', passwd.msg);
    }
    req.flash('username', req.body.username);
    req.flash('password', req.body.password);
    return res.redirect('/auth/login');
  }
  next();
};

export default [uname, passwd, result];
