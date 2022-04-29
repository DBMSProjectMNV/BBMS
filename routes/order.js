import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
import Order from '../models/order.model.js';
import Supplier from '../models/supplier.model.js';
const router = Router();

router.get(
  '/orders/',
  checkLogin,
  async (req, res) => {
    const pending = await Order.pending(req.user.rid);
    const completed = await Order.completed(req.user.rid);
    const cancelled = await Order.cancelled(req.user.rid);
    const suppliers = await Supplier.findAll(req.user.rid);
    const supmap = new Map();
    for (const sup of suppliers) {
      supmap.set(sup['Supplier_id'], sup['Supplier_name']);
    }
    res.render('order.ejs', { pending, completed, cancelled, supmap });
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

router.post('/orders/finish', checkLogin, async (req, res, next) => {
  const oids = await Order.findAll(req.user.rid);
  const set = new Set(oids.map(order => order['Order_id']));
  if (set.has(parseInt(req.query.id, 10))) {
    await Order.finish(req.user.rid, req.query.id);
    req.flash('success', 'order completed and added to inventory successfully');
    res.redirect('/orders/');
  } else {
    next();
  }
});

router.post('/orders/cancel', checkLogin, async (req, res, next) => {
  const rows = (await Order.findAll(req.user.rid));
  const oids = rows.map(order => order['Order_id']);
  if (oids.includes(parseInt(req.query.id, 10))) {
    await Order.cancel(req.user.rid, req.query.id);
    req.flash('success', 'order cancelled');
    res.redirect('/orders/');
  } else {
    next();
  }
});

export default router;
