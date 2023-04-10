import express from 'express';
import { getStore, createStore } from '../controllers/storeController.js';
import { checkLoggedIn, checkSeller } from '../middleware/protectMiddleware.js';

const router = express.Router();

router.route('/').post(checkLoggedIn, checkSeller, createStore);
router.route('/:id').get(getStore);

export default router;
