import express from 'express';
import {
	getStores,
	getStoreById,
	getStoreByOwnerId,
	createStore,
	updateStore,
} from '../controllers/storeController.js';
import { checkLoggedIn, checkSeller } from '../middleware/protectMiddleware.js';

const router = express.Router();

router.route('/').post(createStore).get(getStores);
router
	.route('/:id')
	.get(getStoreById)
	.put(checkLoggedIn, checkSeller, updateStore);
router.route('/owner/:id').get(getStoreByOwnerId);

export default router;
