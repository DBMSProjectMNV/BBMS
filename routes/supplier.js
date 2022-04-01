import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
import Supplier from '../models/supplier.model.js';
const router = Router();

router.get(
  '/suppliers/',
  checkLogin,
  async (req, res) => {
    const staffs = await Supplier.findAll(req.user.rid);
    res.end(JSON.stringify(staffs, null, 4));
  }
);

export default router;
