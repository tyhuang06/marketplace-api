import express from 'express';
import {
	createReview,
	getReviewById,
	getReviewsByStoreId,
	getReviewsByUserId,
	updateReview,
	deleteReview,
} from '../controllers/reviewController.js';
import { checkLoggedIn } from '../middleware/protectMiddleware.js';

const router = express.Router();

router.route('/').post(checkLoggedIn, createReview);
router.route('/store/:id').get(getReviewsByStoreId);
router.route('/user/:id').get(getReviewsByUserId);
router
	.route('/:id')
	.get(getReviewById)
	.put(checkLoggedIn, updateReview)
	.delete(checkLoggedIn, deleteReview);

export default router;
