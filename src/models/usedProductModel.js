import mongoose from 'mongoose';

const UsedProductSchema = new mongoose.Schema({
	asosId: { type: String, required: true },
	store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
	name: { type: String, required: true },
	sellingPrice: { type: Number, required: true },
	originalPrice: { type: Number, required: true },
	condition: { type: String, required: true },
	size: { type: String, required: true },
});

const UsedProductModel = mongoose.model('UsedProduct', UsedProductSchema);

export default UsedProductModel;
