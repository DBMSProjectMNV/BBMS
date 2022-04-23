import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
import Supplier from '../models/supplier.model.js';
import validator from '../middlewares/validators/supplier.js';
const router = Router();

const fields = ['name', 'contact', 'email', 'address'];

router.get(
  '/suppliers/',
  checkLogin,
  async (req, res) => {
    const suppliers = await Supplier.findAll(req.user.rid);
    res.render('supplier.ejs', { suppliers });
  }
);

router.get(
  '/suppliers/edit',
  checkLogin,
  async (req, res, next) => {
    const sup = await Supplier.find(req.user.rid, req.query.id);
    if (sup) {
      res.locals.error = req.flash('error');
      res.render('supplier.edit.ejs', { sup });
    } else {
      next();
    }
  }
);

router.post(
  '/suppliers/edit',
  checkLogin,
  validator,
  async (req, res) => {
    const supplier = {};
    for (const col of fields) {
      if (req.body[col]) {
        supplier[`Supplier_${col}`] = req.body[col];
      }
    }
    if (JSON.stringify(supplier) !== '{}') {
      await Supplier.save(req.user.rid, req.query.id, supplier);
    }
    res.redirect('/suppliers');
  }
);

router.get(
  '/suppliers/delete',
  checkLogin,
  async (req, res) => {
    await Supplier.del(req.user.rid, req.query.id);
    res.redirect('/suppliers');
  }
);

router.get('/suppliers/add', checkLogin, (req, res) => {
  res.locals.error = req.flash('error');
  for (const col of fields) {
    [res.locals[col]] = req.flash(col);
  }
  res.render('supplier.add.ejs');
});

router.post(
  '/suppliers/add',
  checkLogin,
  validator,
  async (req, res) => {
    const sup = {
      'Retailer_id': req.user.rid,
      'Supplier_name': req.body.name,
      'Supplier_contact': req.body.contact,
      'Supplier_email': req.body.email,
      'Supplier_address': req.body.address
    };
    await Supplier.add(sup);
    res.redirect('/suppliers');
  }
);

export default router;
