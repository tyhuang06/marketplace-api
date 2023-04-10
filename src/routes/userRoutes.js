import express from 'express';
import {
	followSeller,
	unfollowSeller,
	getUserProfile,
} from '../controllers/userController.js';
import { checkLoggedIn } from '../middleware/protectMiddleware.js';

const router = express.Router();

router.route('/').get(checkLoggedIn, getUserProfile);
router.route('/follow').post(checkLoggedIn, followSeller);
router.route('/unfollow').post(checkLoggedIn, unfollowSeller);

export default router;
