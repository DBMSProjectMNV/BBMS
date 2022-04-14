import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
import Staff from '../models/staff.model.js';
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
  async (req, res) => {
    const staff = await Staff.find(req.user.rid, req.query.id);
    res.render('staff.edit.ejs', { staff });
  }
);

router.post(
  '/staffs/edit',
  checkLogin,
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

export default router;
