import { Router } from 'express';
import { reservationRouter } from './reservation-routes.js';
import { userRouter } from './user-routes.js';
import { timeSlotRouter } from './time-slot-routes.js';

const router = Router();

router.use('/reservations', reservationRouter);
router.use('/users', userRouter);
router.use('/timeslots', timeSlotRouter);

export default router;