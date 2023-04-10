import express from 'express';
import {
	getOrders,
	createOrder,
	getOrderById,
	getOrdersByUserId,
	updateOrderStatus,
	deleteOrder,
} from '../controllers/orderController.js';
import { checkLoggedIn, checkAdmin } from '../middleware/protectMiddleware.js';

const router = express.Router();

router
	.route('/')
	.post(checkLoggedIn, createOrder)
	.get(checkLoggedIn, checkAdmin, getOrders);
router.route('/user/:id').get(checkLoggedIn, getOrdersByUserId);
router
	.route('/:id')
	.get(checkLoggedIn, getOrderById)
	.put(checkLoggedIn, checkAdmin, updateOrderStatus)
	.delete(checkLoggedIn, checkAdmin, deleteOrder);

export default router;
