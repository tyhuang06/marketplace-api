import express from 'express';
import {
	registerUser,
	loginUser,
	logoutUser,
} from '../controllers/authController.js';
import { checkLoggedIn } from '../middleware/protectMiddleware.js';

const router = express.Router();

router.route('/').get((req, res) => {
	res.send('Hello World from auth');
});
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(checkLoggedIn, logoutUser);

export default router;
