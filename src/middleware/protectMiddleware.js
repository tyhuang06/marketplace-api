import asyncHandler from 'express-async-handler';

const checkLoggedIn = asyncHandler(async (req, res, next) => {
	if (req.session.user) {
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized, please login!');
	}
});

const checkAdmin = asyncHandler(async (req, res, next) => {
	if (req.session.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized as an admin!');
	}
});

const checkSeller = asyncHandler(async (req, res, next) => {
	if (req.session.user.isSeller) {
		next();
	} else {
		res.status(401);
		throw new Error('Not authorized as a seller!');
	}
});

export { checkLoggedIn, checkAdmin, checkSeller };
