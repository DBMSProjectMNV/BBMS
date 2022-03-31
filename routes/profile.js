import { Router } from 'express';
import { checkLogin, userOnly } from '../middlewares/auth.js';
import Retailer from '../models/retailer.model.js';
const router = Router();

router.get(
  '/profile/:name',
  checkLogin,
  (req, res, next) => {
    userOnly(req.params.name, req, res, next);
  },
  async (req, res) => {
    res.end(JSON.stringify(
      await Retailer.find(req.params.name, 'name'),
      null,
      4
    ));
  }
);

export default router;
