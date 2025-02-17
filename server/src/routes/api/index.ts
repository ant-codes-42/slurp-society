import { Router } from 'express';
import { reservationRouter } from './reservation-routes.js';
import { userRouter } from './user-routes.js';

const router = Router();

router.use('/reservations', reservationRouter);
router.use('/users', userRouter);

export default router;