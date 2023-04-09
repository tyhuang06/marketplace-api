import express from 'express';
import {
	registerUser,
	loginUser,
	logoutUser,
} from '../controllers/authController.js';

const router = express.Router();

router.route('/').get((req, res) => {
	res.send('Hello World from auth');
});
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);

export default router;
