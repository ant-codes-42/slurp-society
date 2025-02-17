import express, { Router } from 'express';
import { getAllReservations, createReservation, checkResAvailability } from '../../controllers/reservation-controller.js';

const router: Router = express.Router();

router.get('/', getAllReservations);
router.get('/check', checkResAvailability);
router.post('/', createReservation);

export { router as reservationRouter };