import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
import Retailer from '../models/retailer.model.js';
import validator from '../middlewares/validators/retailer.js';
const router = Router();

const fields = ['name', 'contact', 'email', 'address'];
router.get('/profile', (req, res) => {
  res.redirect('/profile/edit');
});

router.get('/profile/edit', checkLogin, async (req, res) => {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  const ret = await Retailer.find(req.user.name, 'name');
  res.render('profile.edit.ejs', { ret });
});

router.post('/profile/edit', checkLogin, validator, async (req, res) => {
  const ret = {};
  for (const col of fields) {
    if (req.body[col]) {
      ret[`Retailer_${col}`] = req.body[col];
    }
  }
  if (JSON.stringify(ret) !== '{}') {
    await Retailer.save(req.user.rid, ret);
  }
  req.flash('success', 'Updated successfully');
  res.redirect('/profile/edit');
});

router.get(
  '/profile/:name',
  (req, res, next) => {
    if (req.isAuthenticated() && req.user.name && req.params.name) {
      if (
        req.params.name === '' ||
        req.user.name.toLowerCase() === req.params.name.toLowerCase()
      ) {
        return res.redirect('/profile/edit');
      }
    }
    next();
  },
  async (req, res, next) => {
    const ret = await Retailer.find(req.params.name, 'name');
    if (ret) {
      res.render('profile.ejs', { ret });
    } else {
      next();
    }
  }
);

export default router;
