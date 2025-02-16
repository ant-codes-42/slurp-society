import express from 'express';
import { getAllReservations } from '../../controllers/reservation-controller.js';

const router = express.Router();

router.get('/', getAllReservations);

export { router as reservationRouter };