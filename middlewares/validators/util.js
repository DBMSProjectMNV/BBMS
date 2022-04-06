// eslint-ignore prefer-template
import { body, validationResult } from 'express-validator';

const passwdError =
'password may only contain alphanumeric, - _ & % $ # @ ! * and space';

const nameGen = (field, prefix = '') => field.trim()
  .isLength({ min: 1, max: 25 })  // name : 1 to 25
  .withMessage(`${prefix}name must be atmost 25 characters long and non empty`)
  .customSanitizer(value => value.replaceAll(/[ _]/g, '-')) // space '_' -> '-'
  .matches(/^[a-zA-Z][a-zA-Z_\-0-9]*$/)  // :alnum: '-' '_' allowed
  .withMessage(`${prefix}name can only contain alnum, hyphen, underscore`)
  .matches(/-?[a-zA-Z0-9]+$/) // hyphen cannot be last letter
  .withMessage(`${prefix}name should not have last letter hyphen`)
  .customSanitizer(value => value.replaceAll(/-+/g, '-')) // single
  .customSanitizer(value => value.toLowerCase()); // all lower case


const username = nameGen(body('username', 'invalid username'), 'user');

const password = body('password', 'invalid password')
  .trim()
  .isLength({ min: 8 }) // password : 8 to 32
  .withMessage('Password should be atleast 8 characters long')
  .isLength({ max: 32 })
  .withMessage('Password should be at most 32 characters long')
  .matches(/^[a-zA-Z0-9*!@#$%& \-_]*$/)
  .withMessage(passwdError);
  // :aA0-_: '!' '*' '@' '#' '$' '%' '&' ' '

const contact = body('contact', 'invalid contact number')
  .trim()
  .isLength({ min: 10, max: 10 }) // 10 digits
  .withMessage('contact number should be 10 digits')
  .matches(/^[0-9]*$/) // only numbers allowed
  .withMessage('contact number should contain only numbers');

const email = body('email', 'invalid email id')
  .trim()
  .isLength({ min: 1 })
  .withMessage('email id should be non empty')
  .isLength({ max: 40 })
  .withMessage('email id should be atmost 40 characters long')
  .isEmail()
  .normalizeEmail();

const address = body('address', 'invalid address')
  .trim()
  .isLength({ min: 1 })
  .withMessage('address should be non empty')
  .isLength({ max: 75 })
  .withMessage('address should be at most 75 characters')
  .matches(/^[A-Za-z0-9.'\-#@%&/ ]+$/)
  .customSanitizer(value => value.toLowerCase());
  // :aA0-: "." "'" "#" "%" "@" "&" "/" " "

const resultGen = (params, url) => (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    for (const param of params) {
      const [err] = errors.errors.filter(obj => obj.param === param);
      if (err) {
        req.flash('error', err.msg);
      }
      req.flash(param, req.body[param]);
    }
    return res.redirect(url);
  }
  next();
};

export {
  username,
  password,
  contact,
  email,
  address,
  nameGen,
  resultGen
};