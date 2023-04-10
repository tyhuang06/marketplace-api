import asyncHandler from 'express-async-handler';
import StoreModel from '../models/storeModel.js';
import UserModel from '../models/UserModel.js';

const updateUserStoreInfoHelper = asyncHandler(async (userId, storeId) => {
	const updatedUser = await UserModel.findByIdAndUpdate(
		userId,
		{ storeInfo: storeId },
		{ new: true }
	);

	if (updatedUser) {
		return updatedUser;
	} else {
		throw new Error('User update store info failed!');
	}
});

const createStore = asyncHandler(async (req, res) => {
	const { storeName, storeDescription } = req.body;
	const store = await StoreModel.create({
		owner: req.session.user._id,
		storeName,
		storeDescription,
	});

	if (store) {
		// update user model with store info
		const user = await UserModel.findById(store.owner);

		if (user) {
			updateUserStoreInfoHelper(user._id, store._id);
		} else {
			res.status(400);
			throw new Error('User not found!');
		}

		res.status(201).json(store);
	} else {
		res.status(400);
		throw new Error('Store creation failed!');
	}
});

const getStore = asyncHandler(async (req, res) => {
	const store = await StoreModel.findById(req.params.id);

	if (store) {
		res.json(store);
	} else {
		res.status(404);
		throw new Error('Store not found!');
	}
});

export { createStore, getStore };
