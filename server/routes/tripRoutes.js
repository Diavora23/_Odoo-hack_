import express from 'express';
import { 
  getTrips, 
  getTripById, 
  createTrip, 
  updateTrip, 
  deleteTrip,
  addActivityToTrip,
  removeActivityFromTrip
} from '../controllers/tripsController.js';

const router = express.Router();

router.get('/', getTrips);
router.post('/', createTrip);
router.get('/:id', getTripById);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

// Activity specific sub-routes
router.post('/:id/activities', addActivityToTrip);
router.delete('/:id/activities/:activityId', removeActivityFromTrip);

export default router;
