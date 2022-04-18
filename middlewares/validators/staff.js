import { body } from 'express-validator';
import { name, contact, email, address, resultGen } from './util.js';

const params = ['name', 'contact', 'email', 'address', 'jobrole', 'salary'];
const salary = body('salary', 'invalid salary')
  .trim()
  .isInt()
  .withMessage('salary should be a number');

const jobrole = body('jobrole', 'invalid job role')
  .trim()
  .isLength({ min: 1, max: 20 })
  .withMessage('Job role must contain at most 20 characters and non empty')
  .isAscii()
  .withMessage('Invalid characters for job role');

export default url => [
  name,
  contact,
  email,
  address,
  jobrole,
  salary,
  resultGen(params, url)
];
