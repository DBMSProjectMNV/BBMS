import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
import Order from '../models/order.model.js';
import Supplier from '../models/supplier.model.js';
const router = Router();

router.get(
  '/orders/',
  checkLogin,
  async (req, res) => {
    const orders = await Order.findAll(req.user.rid);
    const suppliers = await Supplier.findAll(req.user.rid);
    const supmap = new Map();
    for (const sup of suppliers) {
      supmap.set(sup['Supplier_id'], sup['Supplier_name']);
    }
    res.render('order.ejs', { orders, supmap });
  }
);

router.get(
  '/orders/edit',
  checkLogin,
  async (req, res, next) => {
    const order = await Order.find(req.user.rid, req.query.id);
    if (order) {
      res.locals.error = req.flash('error');
      const suppliers = await Supplier.findAll(req.user.rid);
      res.render('order.edit.ejs', { order, suppliers });
    } else {
      next();
    }
  }
);

router.post(
  '/orders/edit',
  checkLogin,
  async (req, res, next) => {
    if (req.query.id !== req.body.id) {
      return next({
        code: 400,
        desc: 'Bad request',
        content: 'order id malformed'
      });
    }
    const order = {
      'Retailer_id': req.user.rid,
      'Supplier_id': req.body.supplier,
      'Medicine_name': req.body.medname,
      'Quantity': req.body.quantity,
      'MRP': req.body.mrp,
      'Order_date': req.body.ordate
    };
    await Order.save(req.user.rid, req.query.id, order);
    req.flash('success', 'Edit successful');
    res.redirect('/orders/');
  }
);

router.get('/orders/add', checkLogin, async (req, res) => {
  const fields = [
    'supplier',
    'medname',
    'quantity',
    'mrp',
    'ordate'
  ];
  for (const col of fields) {
    [res.locals[col]] = req.flash(col);
  }
  res.locals.error = req.flash('error');
  const suppliers = await Supplier.findAll(req.user.rid);
  res.render('order.add.ejs', { suppliers });
});

router.post('/orders/add', checkLogin, async (req, res) => {
  const order = {
    'Retailer_id': req.user.rid,
    'Supplier_id': req.body.supplier,
    'Medicine_name': req.body.medname,
    'Quantity': req.body.quantity,
    'MRP': req.body.mrp,
    'Order_date': req.body.ordate,
  };
  await Order.add(order);
  res.redirect('/orders');
});

export default router;
