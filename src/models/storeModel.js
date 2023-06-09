import mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
	owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	storeName: { type: String },
	storeDescription: { type: String },
	storeRating: { type: Number, default: 0 },
});

const StoreModel = mongoose.model('Store', StoreSchema);

export default StoreModel;
