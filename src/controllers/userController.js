import asyncHandler from 'express-async-handler';
import UserModel from '../models/UserModel.js';

const updateUserFollow = asyncHandler(async (req, res) => {
	const { followingId } = req.body;

	const updatedUser = await UserModel.findByIdAndUpdate(
		req.session.user._id,
		{ $push: { following: followingId } },
		{ new: true }
	);

	if (updatedUser) {
		res.status(201).json(updatedUser);
	} else {
		res.status(400);
		throw new Error('User update failed!');
	}
});

const updateUserUnfollow = asyncHandler(async (req, res) => {
	const { followingId } = req.body;

	const updatedUser = await UserModel.findByIdAndUpdate(
		req.session.user._id,
		{ $pull: { following: followingId } },
		{ new: true }
	);

	if (updatedUser) {
		res.status(201).json(updatedUser);
	} else {
		res.status(400);
		throw new Error('User update failed!');
	}
});

export { updateUserFollow, updateUserUnfollow };
