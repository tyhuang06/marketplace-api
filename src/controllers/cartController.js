import asyncHandler from 'express-async-handler';
import CartModel from '../models/cartModel.js';

const createCartHelper = async (userId) => {
	const newCart = await CartModel.create({
		user: userId,
		items: [],
	});

	if (newCart) {
		return newCart;
	} else {
		throw new Error('Cart creation failed!');
	}
};

// @desc    Add item to cart
// @route   POST /cart/add
// @access  Private
const addItemToCart = asyncHandler(async (req, res) => {
	const { usedProductId } = req.body;
	const userId = req.session.user._id;

	// Find the cart of the user
	const cart = await CartModel.findOne({ user: userId });

	// If the cart doesn't exist, create a new one with the item
	if (!cart) {
		const newCart = await createCartHelper(userId);

		newCart.items.push(usedProductId);
		await newCart.save();

		res.status(201).json(newCart);
	} else {
		// If the cart exists, check if the item is already in the cart
		const itemExists = cart.items.find(
			(item) => item.usedProductId === usedProductId
		);

		// If the item is not in the cart, add it
		if (!itemExists) {
			cart.items.push(usedProductId);
			await cart.save();
		}

		res.status(201).json(cart);
	}
});

// @desc    Remove item from cart
// @route   POST /cart/remove
// @access  Private
const removeItemFromCart = asyncHandler(async (req, res) => {
	const { usedProductId } = req.body;
	const userId = req.session.user._id;

	const cart = await CartModel.findOneAndUpdate(
		{ user: userId },
		{ $pull: { items: usedProductId } },
		{ new: true }
	);

	if (cart) {
		res.status(201).json(cart);
	} else {
		res.status(400);
		throw new Error('Cart update failed!');
	}
});

// @desc    Get cart by current user
// @route   GET /cart
// @access  Private
const getCartByUserId = asyncHandler(async (req, res) => {
	const cart = await CartModel.findOne({
		user: req.session.user._id,
	}).populate('items');

	if (cart) {
		res.json(cart);
	} else {
		// If the cart doesn't exist, create a new one
		const newCart = await createCartHelper(req.session.user._id);
		res.status(201).json(newCart);
	}
});

export { addItemToCart, removeItemFromCart, getCartByUserId };
