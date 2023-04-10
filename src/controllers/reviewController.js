import asyncHandler from 'express-async-handler';
import ReviewModel from '../models/reviewModel.js';

// @desc    Create a new review
// @route   POST /review
// @access  Private
const createReview = asyncHandler(async (req, res) => {
	const { rating, comment, storeId } = req.body;

	const review = await ReviewModel.create({
		rating,
		comment,
		storeId,
		reviewer: req.session.user._id,
	});

	if (review) {
		res.status(201).json(review);
	} else {
		res.status(400);
		throw new Error('Review creation failed!');
	}
});

// @desc	Get review by id
// @route	GET /review/:id
// @access	Public
const getReviewById = asyncHandler(async (req, res) => {
	const review = await ReviewModel.findById(req.params.id);

	if (review) {
		res.json(review);
	} else {
		res.status(404);
		throw new Error('Review not found!');
	}
});

// @desc    Get reviews by store id
// @route   GET /review/store/:id
// @access  Public
const getReviewsByStoreId = asyncHandler(async (req, res) => {
	const reviews = await ReviewModel.find({ storeId: req.params.id }).populate(
		'reviewer'
	);

	if (reviews) {
		res.json(reviews);
	} else {
		res.status(404);
		throw new Error('Reviews not found!');
	}
});

// @desc    Get reviews by user id
// @route   GET /review/user/:id
// @access  Public
const getReviewsByUserId = asyncHandler(async (req, res) => {
	const reviews = await ReviewModel.find({
		reviewer: req.params.id,
	}).populate('storeId');

	if (reviews) {
		res.json(reviews);
	} else {
		res.status(404);
		throw new Error('Reviews not found!');
	}
});

// @desc    Update a review
// @route   PUT /review/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
	const { rating, comment } = req.body;
	const review = await ReviewModel.findByIdAndUpdate(
		req.params.id,
		{ rating, comment },
		{ new: true }
	);

	if (review) {
		res.status(201).json(review);
	} else {
		res.status(400);
		throw new Error('Review update failed!');
	}
});

// @desc    Delete a review
// @route   DELETE /review/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
	const review = await ReviewModel.findByIdAndDelete(req.params.id);

	if (review) {
		res.json({ message: 'Review deleted!' });
	} else {
		res.status(404);
		throw new Error('Review not found!');
	}
});

export {
	createReview,
	getReviewById,
	getReviewsByStoreId,
	getReviewsByUserId,
	updateReview,
	deleteReview,
};
