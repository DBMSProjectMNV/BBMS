import { name, contact, email, address, resultGen } from './util.js';

const params = ['name', 'contact', 'email', 'address'];
export default [
  name,
  contact,
  email,
  address,
  resultGen(params)
];
