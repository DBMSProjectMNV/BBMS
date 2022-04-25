import { username, passwordGen, resultGen } from './util.js';

const result = resultGen(['username', 'password'], '/auth/login');

export default [username, passwordGen('password'), result];
