import { Router } from 'express';
import { checkLogin } from '../middlewares/auth.js';
const router = Router();

router.get('/dashboard', checkLogin, (req, res) => {
  res.render('dashboard.ejs', {
    name: (req.user && req.user.name) || 'anonymous'
  });
});

export default router;
