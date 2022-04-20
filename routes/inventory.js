import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
import Inventory from '../models/inventory.model.js';
import validator from '../middlewares/validators/inventory.js';
const router = Router();

const params = ['name', 'mrp', 'stock'];

router.get(
  '/inventory/',
  checkLogin,
  async (req, res) => {
    const medicines = await Inventory.findAll(req.user.rid);
    res.render('inventory.ejs', { medicines });
  }
);

router.get(
  '/inventory/edit',
  checkLogin,
  async (req, res, next) => {
    const med = await Inventory.find(req.user.rid, req.query.name);
    if (med) {
      res.locals.error = req.flash('error');
      res.render('inventory.edit.ejs', { med });
    } else {
      next();
    }
  }
);

router.post(
  '/inventory/edit',
  checkLogin,
  validator,
  async (req, res) => {
    const med = {};
    if (req.body.mrp) {
      med.MRP = req.body.mrp;
    }
    if (req.body.stock) {
      med.Stock = req.body.stock;
    }
    if (req.body.name) {
      med['Medicine_name'] = req.body.name;
    }
    if (JSON.stringify(med) !== '{}') {
      await Inventory.save(req.user.rid, req.query.name, med);
    }
    res.redirect('/inventory');
  }
);

router.get(
  '/inventory/delete',
  checkLogin,
  async (req, res) => {
    await Inventory.del(req.user.rid, req.query.name);
    res.redirect('/inventory');
  }
);

router.get(
  '/inventory/add',
  checkLogin,
  (req, res) => {
    res.locals.error = req.flash('error');
    for (const param of params) {
      [res.locals[param]] = req.flash(param);
    }
    res.render('inventory.add.ejs');
  }
);

router.post(
  '/inventory/add',
  checkLogin,
  validator,
  async (req, res) => {
    const med = {
      'Retailer_id': req.user.rid,
      'Medicine_name': req.body.name,
      'MRP': req.body.mrp,
      'Stock': req.body.stock
    };
    await Inventory.add(med);
    res.redirect('/inventory');
  }
);

export default router;
