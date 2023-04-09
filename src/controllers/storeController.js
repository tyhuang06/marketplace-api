import asyncHandler from 'express-async-handler';
import StoreModel from '../models/storeModel.js';

const createStore = asyncHandler(async (req, res) => {
	const { storeName, storeDescription } = req.body;
	const store = await StoreModel.create({
		owner: req.session.user._id,
		storeName,
		storeDescription,
	});
	if (store) {
		res.status(201).json({
			_id: store._id,
			storeName: store.storeName,
			storeDescription: store.storeDescription,
			storeProducts: store.storeProducts,
			storeRating: store.storeRating,
			reviews: store.reviews,
		});
	} else {
		res.status(400);
		throw new Error('Store creation failed!');
	}
});
