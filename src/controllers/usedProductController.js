import asyncHandler from 'express-async-handler';
import UsedProductModel from '../models/UsedProductModel.js';

// @desc    Create a new used product
// @route   POST /usedproduct
// @access  Private (seller)
const createUsedProduct = asyncHandler(async (req, res) => {
	const { name, asosId, sellingPrice, condition, size } = req.body;
	const storeId = req.session.user.storeInfo;

	const usedProduct = await UsedProductModel.create({
		name,
		asosId,
		storeId,
		sellingPrice,
		condition,
		size,
	});

	if (usedProduct) {
		res.status(201).json(usedProduct);
	} else {
		res.status(400);
		throw new Error('Used product creation failed!');
	}
});

// @desc    Get used product by id
// @route   GET /usedproduct/:id
// @access  Public
const getUsedProductById = asyncHandler(async (req, res) => {
	const usedProduct = await UsedProductModel.findById(req.params.id);

	if (usedProduct) {
		res.json(usedProduct);
	} else {
		res.status(404);
		throw new Error('Used product not found!');
	}
});

// @desc    Get used products by store id
// @route   GET /usedproduct/store/:id
// @access  Public
const getUsedProductsByStoreId = asyncHandler(async (req, res) => {
	const usedProducts = await UsedProductModel.find({
		storeId: req.params.id,
	});

	if (usedProducts) {
		res.json(usedProducts);
	} else {
		res.status(404);
		throw new Error('Used products not found!');
	}
});

// @desc    Get used products by asos id
// @route   GET /usedproduct/asos/:id
// @access  Public
const getUsedProductsByAsosId = asyncHandler(async (req, res) => {
	const usedProducts = await UsedProductModel.find({
		asosId: req.params.id,
	}).populate('storeId');

	if (usedProducts) {
		res.json(usedProducts);
	} else {
		res.status(404);
		throw new Error('Used products not found!');
	}
});

// @desc    Update used product
// @route   PUT /usedproduct/:id
// @access  Private (seller)
const updateUsedProduct = asyncHandler(async (req, res) => {
	const { name, sellingPrice, condition, size } = req.body;

	const usedProduct = await UsedProductModel.findByIdAndUpdate(
		req.params.id,
		{
			name,
			sellingPrice,
			condition,
			size,
		},
		{ new: true }
	);

	if (usedProduct) {
		res.json(usedProduct);
	} else {
		res.status(404);
		throw new Error('Used product not found!');
	}
});

// @desc    Delete used product
// @route   DELETE /usedproduct/:id
// @access  Private (seller)
const deleteUsedProduct = asyncHandler(async (req, res) => {
	const usedProduct = await UsedProductModel.findByIdAndDelete(req.params.id);

	if (usedProduct) {
		res.json({ message: 'Product deleted!' });
	} else {
		res.status(404);
		throw new Error('Used product not found!');
	}
});

export {
	createUsedProduct,
	getUsedProductById,
	getUsedProductsByStoreId,
	getUsedProductsByAsosId,
	updateUsedProduct,
	deleteUsedProduct,
};
