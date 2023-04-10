import express from 'express';
import {
	addItemToCart,
	removeItemFromCart,
	getCartByUserId,
} from '../controllers/cartController.js';
import { checkLoggedIn } from '../middleware/protectMiddleware.js';

const router = express.Router();

router.route('/').get(checkLoggedIn, getCartByUserId);
router.route('/add').post(checkLoggedIn, addItemToCart);
router.route('/remove').post(checkLoggedIn, removeItemFromCart);

export default router;
