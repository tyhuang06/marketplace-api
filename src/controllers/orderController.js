import asyncHandler from 'express-async-handler';
import OrderModel from '../models/orderModel.js';

// @desc    Create a new order
// @route   POST /order
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
	const { items, shippingAddress } = req.body;

	const totalPrice = items.reduce((acc, item) => acc + item.sellingPrice, 0);

	const order = await OrderModel.create({
		items,
		shippingAddress,
		user: req.session.user._id,
		totalPrice,
	});

	if (order) {
		res.status(201).json(order);
	} else {
		res.status(400);
		throw new Error('Order creation failed!');
	}
});

// @desc    Get order by id
// @route   GET /order/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await OrderModel.findById(req.params.id).populate('items');

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found!');
	}
});

// @desc    Get orders by user id
// @route   GET /order/user/:id
// @access  Private
const getOrdersByUserId = asyncHandler(async (req, res) => {
	const orders = await OrderModel.find({ user: req.params.id }).populate(
		'items'
	);

	if (orders) {
		res.json(orders);
	} else {
		res.status(404);
		throw new Error('Orders not found!');
	}
});

// @desc    Update order status
// @route   PUT /order/:id
// @access  Private (Admin)
const updateOrderStatus = asyncHandler(async (req, res) => {
	const { status } = req.body;

	const order = await OrderModel.findByIdAndUpdate(
		req.params.id,
		{ status },
		{ new: true }
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order not found!');
	}
});

// @desc    Delete order
// @route   DELETE /order/:id
// @access  Private (Admin, User)
const deleteOrder = asyncHandler(async (req, res) => {
	// Check if the user is an admin or the order belongs to the user
	const order = await OrderModel.findById(req.params.id);
	if (
		req.session.user.isAdmin ||
		order.user.toString() === req.session.user._id.toString()
	) {
		const deletedOrder = await order.remove();
		res.json(deletedOrder);
	} else {
		res.status(401);
		throw new Error('Unauthorized!');
	}
});

export {
	createOrder,
	getOrderById,
	getOrdersByUserId,
	updateOrderStatus,
	deleteOrder,
};
