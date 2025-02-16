import express, { Router } from 'express';
import { getAllReservations, createReservation } from '../../controllers/reservation-controller.js';

const router: Router = express.Router();

router.get('/', getAllReservations);
router.post('/create', createReservation); // currently broken, cannot figure out this type error...

export { router as reservationRouter };