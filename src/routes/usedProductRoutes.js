import express from 'express';
import {
	createUsedProduct,
	getUsedProductById,
	getUsedProductsByStoreId,
	getUsedProductsByAsosId,
	updateUsedProduct,
	deleteUsedProduct,
} from '../controllers/usedProductController.js';
import { checkLoggedIn, checkSeller } from '../middleware/protectMiddleware.js';

const router = express.Router();

router.route('/').post(checkLoggedIn, checkSeller, createUsedProduct);
router
	.route('/:id')
	.get(getUsedProductById)
	.put(checkLoggedIn, checkSeller, updateUsedProduct)
	.delete(checkLoggedIn, checkSeller, deleteUsedProduct);
router.route('/store/:id').get(getUsedProductsByStoreId);
router.route('/asos/:id').get(getUsedProductsByAsosId);

export default router;
