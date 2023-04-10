import asyncHandler from 'express-async-handler';
import UserModel from '../models/UserModel.js';

// @desc    Register a new user
// @route   POST /auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const {
		username,
		email,
		password,
		profilePic,
		isAdmin,
		isBuyer,
		isSeller,
		storeInfo,
	} = req.body;

	if (!username || !email || !password) {
		res.status(400);
		throw new Error('Please enter all the fields!');
	}

	// check if user already exists
	const userExists = await UserModel.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('User already exists!');
	}

	const user = await UserModel.create({
		username,
		email,
		password,
		profilePic,
		isAdmin,
		isBuyer,
		isSeller,
		storeInfo,
	});

	if (user) {
		res.status(201).json(user);
	} else {
		res.status(400);
		throw new Error('User creation failed!');
	}
});

// @desc    Login a user
// @route   POST /auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await UserModel.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		req.session.user = user;
		res.json(user);
	} else {
		res.status(401);
		throw new Error('Invalid email or password!');
	}
});

// @desc    Logout a user
// @route   POST /auth/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
	req.session.destroy();
	res.clearCookie('connect.sid');
	res.json({ message: 'Logged out successfully!' });
});

export { registerUser, loginUser, logoutUser };
