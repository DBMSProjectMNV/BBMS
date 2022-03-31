import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
import Staff from '../models/staff.model.js';
const router = Router();

router.get(
  '/staffs/',
  checkLogin,
  async (req, res) => {
    const staffs = await Staff.findAll(req.user.rid);
    res.end(JSON.stringify(staffs, null, 4));
  }
);

export default router;
