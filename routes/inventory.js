import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
import Inventory from '../models/inventory.model.js';
const router = Router();

router.get(
  '/inventory/',
  checkLogin,
  async (req, res) => {
    const staffs = await Inventory.findAll(req.user.rid);
    res.end(JSON.stringify(staffs, null, 4));
  }
);

export default router;