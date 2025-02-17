import express from 'express';
import { createTimeSlot, getAllTimeSlots } from '../../controllers/time-slot-controller.js';

const router = express.Router();

router.get('/', getAllTimeSlots); // not sure how useful this is, probably modify to get a range
router.post('/', createTimeSlot);

export { router as timeSlotRouter };