import express from 'express';
import { 
  getCommunityTrips, 
  toggleLikeTrip, 
  forkCommunityTrip 
} from '../controllers/communityController.js';

const router = express.Router();

router.get('/', getCommunityTrips);
router.post('/:id/like', toggleLikeTrip);
router.post('/:id/fork', forkCommunityTrip);

export default router;
