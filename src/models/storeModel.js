import mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	storeName: { type: String },
	storeDescription: { type: String },
	storeProducts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'UsedProduct',
		},
	],
	storeRating: { type: Number, default: 0 },
	reviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review',
		},
	],
});

const StoreModel = mongoose.model('Store', StoreSchema);

export default StoreModel;
