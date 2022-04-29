import { body } from 'express-validator';
import { name, resultGen } from './util.js';

const params = ['name', 'quantity', 'mrp', 'ordate', 'supplier'];
const mrp = body('mrp', 'invalid MRP')
  .trim()
  .isInt()
  .withMessage('MRP should be a number');

const qty = body('quantity', 'invalid value for quantity')
  .trim()
  .isInt()
  .withMessage('quantity value should be a number');

const date = body('ordate', 'invalid order date')
  .trim()
  .isDate()
  .withMessage('order date must be a valid date');

const supplier = body('supplier', 'invalid supplier for order')
  .trim()
  .isInt()
  .withMessage('supplier id must be a number');

export default [name, qty, mrp, date, supplier, resultGen(params)];
