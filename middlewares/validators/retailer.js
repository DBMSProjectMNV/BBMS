import { body } from 'express-validator';
import { name, contact, email, address, resultGen } from './util.js';

const hintq = body('hintq', 'invalid hint question')
  .trim()
  .isLength({ min: 1 })
  .withMessage('Hint question should be non empty')
  .isLength({ max: 40 })
  .withMessage('Hint question should be at most 40 characters long')
  .customSanitizer(value => value.toLowerCase());

const answer = body('answer', 'invalid hint answer')
  .trim()
  .isLength({ min: 1 })
  .withMessage('Answer should be non empty')
  .isLength({ max: 25 })
  .withMessage('Answer should be max 25 characters long')
  .customSanitizer(value => value.toLowerCase());

const params = ['name', 'contact', 'email', 'address', 'hintq', 'answer'];
export default url => [
  name,
  contact,
  email,
  address,
  hintq,
  answer,
  resultGen(params, url)
];
