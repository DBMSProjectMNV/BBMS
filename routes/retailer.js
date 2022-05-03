import { Router } from 'express';
import Retailer from '../models/retailer.model.js';
const router = Router();

router.get('/all', async (req, res) => {
  const retailers = await Retailer.findAll();
  res.render('retailer.ejs', { retailers });
});

export default router;
