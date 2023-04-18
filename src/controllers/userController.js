import asyncHandler from 'express-async-handler';
import UserModel from '../models/UserModel.js';

// @desc    Get user profile
// @route   GET /user
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await UserModel.findById(req.session.user._id)
		.populate('following')
		.populate('followers');

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found!');
	}
});

// @desc    Get user profile by id
// @route   GET /user/:id
// @access  Public
const getUserProfileById = asyncHandler(async (req, res) => {
	const user = await UserModel.findById(req.params.id)
		.populate('following')
		.populate('followers');

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found!');
	}
});

// @desc	Update user profile
// @route	PUT /user
// @access	Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const { profilePic } = req.body;

	const updatedUser = await UserModel.findByIdAndUpdate(
		req.session.user._id,
		{
			profilePic,
		},
		{ new: true }
	);

	if (updatedUser) {
		res.json(updatedUser);
	} else {
		res.status(404);
		throw new Error('User not found!');
	}
});

// @desc    Follow a Seller
// @route   POST /user/follow
// @access  Private
const followSeller = asyncHandler(async (req, res) => {
	const { targetUserId } = req.body;

	// Check if the user is already following the target user
	const user = await UserModel.findById(req.session.user._id);
	const isFollowing = user.following.find(
		(followingId) => followingId.toString() === targetUserId
	);

	if (isFollowing) {
		res.status(400);
		throw new Error('You are already following this seller!');
	}

	// Update the user's following list
	const updatedUser = await UserModel.findByIdAndUpdate(
		req.session.user._id,
		{ $push: { following: targetUserId } },
		{ new: true }
	);

	// Update the target user's followers list
	const updatedTargetUser = await UserModel.findByIdAndUpdate(
		targetUserId,
		{ $push: { followers: req.session.user._id } },
		{ new: true }
	);

	if (updatedUser && updatedTargetUser) {
		res.status(201).json(updatedUser);
	} else {
		res.status(400);
		throw new Error('User update failed!');
	}
});

// @desc    Unfollow a Seller
// @route   POST /user/unfollow
// @access  Private
const unfollowSeller = asyncHandler(async (req, res) => {
	const { targetUserId } = req.body;

	// Update user's following list
	const updatedUser = await UserModel.findByIdAndUpdate(
		req.session.user._id,
		{ $pull: { following: targetUserId } },
		{ new: true }
	);

	// Update target user's followers list
	const updatedTargetUser = await UserModel.findByIdAndUpdate(
		targetUserId,
		{ $pull: { followers: req.session.user._id } },
		{ new: true }
	);

	if (updatedUser && updatedTargetUser) {
		res.status(201).json(updatedUser);
	} else {
		res.status(400);
		throw new Error('User update failed!');
	}
});

export {
	followSeller,
	unfollowSeller,
	getUserProfile,
	getUserProfileById,
	updateUserProfile,
};
