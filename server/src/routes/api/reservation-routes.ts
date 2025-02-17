import express, { Router } from 'express';
import { getAllReservations, createReservation, checkResAvailability } from '../../controllers/reservation-controller.js';

const router: Router = express.Router();

router.get('/', getAllReservations);
router.get('/check', checkResAvailability);
router.post('/create', createReservation); // currently broken, cannot figure out this type error...

export { router as reservationRouter };