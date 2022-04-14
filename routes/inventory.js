import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
import Inventory from '../models/inventory.model.js';
const router = Router();

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
  async (req, res) => {
    const med = await Inventory.find(req.user.rid, req.query.name);
    res.render('inventory.edit.ejs', { med });
  }
);

router.post(
  '/inventory/edit',
  checkLogin,
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
      await Inventory.save(req.user.rid, req.query.medname, med);
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

export default router;
