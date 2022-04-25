import {
  name,
  passwordGen,
  contact,
  email,
  address,
  hintq,
  answer,
  resultGen
} from './util.js';

const params = [
  'name',
  'password',
  'hintq',
  'answer',
  'contact',
  'email',
  'address'
];

const result = resultGen(params, '/auth/register');

export default [
  name,
  passwordGen('password'),
  hintq,
  answer,
  contact,
  email,
  address,
  result
];
