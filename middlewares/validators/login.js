import { username, password, resultGen } from './util.js';

const result = resultGen(['username', 'password'], '/auth/login');

export default [username, password, result];
