import { body } from 'express-validator';
import { name, resultGen } from './util.js';

const params = ['name', 'mrp', 'stock'];
const mrp = body('mrp', 'invalid MRP')
  .trim()
  .isInt()
  .withMessage('MRP should be a number');

const stock = body('stock', 'invalid value for stock')
  .trim()
  .isInt()
  .withMessage('stock value should be a number');

export default url => [name, mrp, stock, resultGen(params, url)];
