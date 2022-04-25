import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
import Staff from '../models/staff.model.js';
import validator from '../middlewares/validators/staff.js';
const router = Router();

router.get(
  '/staffs/',
  checkLogin,
  async (req, res) => {
    const staffs = await Staff.findAll(req.user.rid);
    res.render('staff.ejs', { staffs });
  }
);

router.get(
  '/staffs/edit',
  checkLogin,
  async (req, res, next) => {
    const staff = await Staff.find(req.user.rid, req.query.id);
    if (staff) {
      res.locals.error = req.flash('error');
      res.render('staff.edit.ejs', { staff });
    } else {
      next();
    }
  }
);

router.post(
  '/staffs/edit',
  checkLogin,
  validator,
  async (req, res) => {
    const fields = ['name', 'contact', 'email', 'address'];
    const staff = {};
    if (req.body.salary) {
      staff.Salary = req.body.salary;
    }
    if (req.body.jobrole) {
      staff['Job_role'] = req.body.jobrole;
    }
    for (const col of fields) {
      if (req.body[col]) {
        staff[`Staff_${col}`] = req.body[col];
      }
    }
    if (JSON.stringify(staff) !== '{}') {
      await Staff.save(req.user.rid, req.query.id, staff);
    }
    res.redirect('/staffs');
  }
);

router.get(
  '/staffs/delete',
  checkLogin,
  async (req, res) => {
    await Staff.del(req.user.rid, req.query.id);
    res.redirect('/staffs');
  }
);

router.get('/staffs/add', checkLogin, (req, res) => {
  const fields = ['name', 'contact', 'email', 'address', 'salary', 'jobrole'];
  for (const col of fields) {
    [res.locals[col]] = req.flash(col);
  }
  res.locals.error = req.flash('error');
  res.render('staff.add.ejs');
});

router.post('/staffs/add', checkLogin, validator, async (req, res) => {
  const staff = {
    'Retailer_id': req.user.rid,
    'Staff_name': req.body.name,
    'Staff_contact': req.body.contact,
    'Staff_email': req.body.email,
    'Staff_address': req.body.address,
    'Job_role': req.body.jobrole,
    'Salary': req.body.salary
  };
  await Staff.add(staff);
  res.redirect('/staffs');
});

export default router;
