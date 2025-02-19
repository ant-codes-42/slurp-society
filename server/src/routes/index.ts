import { Router } from 'express';
import apiRoutes from './api/index.js';
import authRoutes from './auth-routes.js'

const router = Router();

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);


export default router;
