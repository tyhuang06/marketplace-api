import asyncHandler from 'express-async-handler';
import StoreModel from '../models/storeModel.js';
import UserModel from '../models/UserModel.js';

// @desc	Get all stores
// @route	GET /store
// @access	Public
const getStores = asyncHandler(async (req, res) => {
	const stores = await StoreModel.find({}).populate('owner');

	if (stores) {
		res.json(stores);
	} else {
		res.status(404);
		throw new Error('No stores found!');
	}
});

// @desc    Create a new store
// @route   POST /store
// @access  Public
const createStore = asyncHandler(async (req, res) => {
	const { storeName, storeDescription, ownerId } = req.body;
	const store = await StoreModel.create({
		owner: ownerId,
		storeName,
		storeDescription,
	});

	if (store) {
		/* // update user model with store info
		const user = await UserModel.findById(store.owner);

		if (user) {
			updateUserStoreInfoHelper(user._id, store._id);
		} else {
			res.status(400);
			throw new Error('User not found!');
		} */

		res.status(201).json(store);
	} else {
		res.status(400);
		throw new Error('Store creation failed!');
	}
});

// @desc    Get store by id
// @route   GET /store/:id
// @access  Public
const getStoreById = asyncHandler(async (req, res) => {
	const store = await StoreModel.findById(req.params.id);

	if (store) {
		res.json(store);
	} else {
		res.status(404);
		throw new Error('Store not found!');
	}
});

// @desc	Get store by owner id
// @route	GET /store/owner/:id
// @access	Public
const getStoreByOwnerId = asyncHandler(async (req, res) => {
	const store = await StoreModel.findOne({ owner: req.params.id }).populate(
		'owner'
	);

	if (store) {
		res.json(store);
	} else {
		res.status(404);
		throw new Error('Store not found!');
	}
});

// @desc    Update a store
// @route   PUT /store/:id
// @access  Private (seller)
const updateStore = asyncHandler(async (req, res) => {
	const { storeName, storeDescription } = req.body;

	// check if the store belongs to the user
	const store = await StoreModel.findById(req.params.id);
	if (store.owner.toString() !== req.session.user._id.toString()) {
		res.status(401);
		throw new Error('Not authorized to update this store!');
	}

	const updatedStore = await StoreModel.findByIdAndUpdate(
		req.params.id,
		{ storeName, storeDescription },
		{ new: true }
	);

	if (updatedStore) {
		res.json(updatedStore);
	} else {
		res.status(404);
		throw new Error('Store not found!');
	}
});

export { getStores, createStore, getStoreById, updateStore, getStoreByOwnerId };
