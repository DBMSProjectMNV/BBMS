import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
import Retailer from '../models/retailer.model.js';
const router = Router();

router.get('/profile', (req, res) => {
  res.redirect('/profile/edit');
});

router.get('/profile/edit', checkLogin, async (req, res) => {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  const ret = await Retailer.find(req.user.name, 'name');
  res.render('profile.edit.ejs', { ret });
});

router.post('/profile/edit', checkLogin, async (req, res) => {
  const fields = ['name', 'contact', 'email', 'address'];
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
    try {
      const ret = await Retailer.find(req.params.name, 'name');
      res.render('profile.ejs', { ret });
    } catch (error) {
      console.log(error);
      next();
    }
  }
);

export default router;
